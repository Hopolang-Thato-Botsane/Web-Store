using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using HtmlAgilityPack;
using Newtonsoft.Json;

namespace CameraScraper
{
    public class Review
    {
        public string Author { get; set; } = "";
        public bool IsVerified { get; set; } = true;
        public int Rating { get; set; }
        public string Comment { get; set; } = "";
    }

    public class Accessory
    {
        public string Name { get; set; } = "";
        public string Price { get; set; } = "";
        public string ImageUrl { get; set; } = "";
        public List<string> Specs { get; set; } = new List<string>();
    }

    public class ProductDetail
    {
        public string Id { get; set; } = "";
        public string Category { get; set; } = "";
        public string Brand { get; set; } = "";
        public string Name { get; set; } = "";
        public string Price { get; set; } = "";
        public double RatingScore { get; set; }
        public int ReviewCount { get; set; }
        public string Description { get; set; } = "";
        public List<string> GalleryImages { get; set; } = new List<string>();
        public Dictionary<string, string> TechSpecs { get; set; } = new Dictionary<string, string>();
        public List<Review> Reviews { get; set; } = new List<Review>();
        public List<Accessory> RelatedAccessories { get; set; } = new List<Accessory>();
    }

    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("🚀 Launching Orms Direct E-Commerce Scraper...");

            var categoryUrls = new Dictionary<string, string>
            {
                { "Cameras", "https://www.ormsdirect.co.za/collections/digital-cameras" },
                { "Lenses", "https://www.ormsdirect.co.za/collections/camera-lenses" },
                { "Lighting", "https://www.ormsdirect.co.za/collections/continuous-lighting" },
                { "Accessories", "https://www.ormsdirect.co.za/collections/memory-cards" }
            };

            var allScrapedProducts = new List<ProductDetail>();
            var web = new HtmlWeb();
            web.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

            foreach (var categoryPair in categoryUrls)
            {
                string categoryName = categoryPair.Key;
                string url = categoryPair.Value;

                Console.WriteLine($"🔍 Scraping category [{categoryName}] from {url}...");

                try
                {
                    HtmlDocument doc = await web.LoadFromWebAsync(url);

                    var productCardNodes = doc.DocumentNode.SelectNodes("//div[contains(@class, 'product-item') or contains(@class, 'grid-view-item') or contains(@class, 'card')]");

                    if (productCardNodes != null)
                    {
                        foreach (var node in productCardNodes)
                        {
                            string rawTitle = node.SelectSingleNode(".//a[contains(@class, 'product-card__title') or contains(@class, 'title')]")?.InnerText.Trim() 
                                           ?? node.SelectSingleNode(".//h3")?.InnerText.Trim() 
                                           ?? "Unknown Product";

                            string rawPrice = node.SelectSingleNode(".//span[contains(@class, 'price') or contains(@class, 'money')]")?.InnerText.Trim() 
                                           ?? "R 0";

                            // UPDATED: Robust lazy-load image extraction
                            var imgNode = node.SelectSingleNode(".//img");
                            string rawImgUrl = "";

                            if (imgNode != null)
                            {
                                rawImgUrl = imgNode.GetAttributeValue("data-src", "")
                                         ?? imgNode.GetAttributeValue("data-srcset", "")
                                         ?? imgNode.GetAttributeValue("srcset", "")
                                         ?? imgNode.GetAttributeValue("src", "");

                                if (rawImgUrl.Contains(","))
                                {
                                    rawImgUrl = rawImgUrl.Split(',')[0].Trim().Split(' ')[0];
                                }

                                if (rawImgUrl.StartsWith("//"))
                                {
                                    rawImgUrl = "https:" + rawImgUrl;
                                }
                            }

                            string generatedId = rawTitle.ToLower()
                                .Replace(" ", "-")
                                .Replace("/", "-")
                                .Replace("(", "")
                                .Replace(")", "");

                            var dynamicProduct = new ProductDetail
                            {
                                Id = generatedId,
                                Category = categoryName,
                                Brand = ExtractBrandFromName(rawTitle),
                                Name = rawTitle,
                                Price = rawPrice,
                                Description = $"High-performance {categoryName.ToLower()} gear available from Orms Direct.",
                                RatingScore = 5.0,
                                ReviewCount = 1,
                                GalleryImages = new List<string> { rawImgUrl }
                            };

                            allScrapedProducts.Add(dynamicProduct);
                        }

                        Console.WriteLine($"   -> Successfully extracted {productCardNodes.Count} items for {categoryName}.");
                    }
                    else
                    {
                        Console.WriteLine($"   -> No product grid nodes found for {categoryName}. Selectors may need adjustment.");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"   -> Error crawling {categoryName}: {ex.Message}");
                }
            }

            string jsonOutput = JsonConvert.SerializeObject(allScrapedProducts, Formatting.Indented);
            string outputPath = Path.Combine(Directory.GetCurrentDirectory(), "products.json");
            await File.WriteAllTextAsync(outputPath, jsonOutput);

            Console.WriteLine($"💾 Master dataset successfully exported to: {outputPath}");
        }

        private static string ExtractBrandFromName(string title)
        {
            if (title.StartsWith("Canon", StringComparison.OrdinalIgnoreCase)) return "Canon";
            if (title.StartsWith("Nikon", StringComparison.OrdinalIgnoreCase)) return "Nikon";
            if (title.StartsWith("Sony", StringComparison.OrdinalIgnoreCase)) return "Sony";
            if (title.StartsWith("Fujifilm", StringComparison.OrdinalIgnoreCase)) return "Fujifilm";
            if (title.StartsWith("Kodak", StringComparison.OrdinalIgnoreCase)) return "Kodak";
            if (title.StartsWith("Manfrotto", StringComparison.OrdinalIgnoreCase)) return "Manfrotto";
            return "Professional Gear";
        }
    }
}