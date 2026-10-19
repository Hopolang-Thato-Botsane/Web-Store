using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CameraScraper
{
    public class Review
    {
        public string Author { get; set; } = "Verified Buyer";
        public bool IsVerified { get; set; } = true;
        public int Rating { get; set; } = 5;
        public string Comment { get; set; } = "Exceptional performance and crystal-clear optics.";
    }

    public class ProductDetail
    {
        public string Id { get; set; } = "";
        public string Category { get; set; } = "";
        public string Brand { get; set; } = "";
        public string Name { get; set; } = "";
        public string Price { get; set; } = "";
        public double RatingScore { get; set; } = 5.0;
        public int ReviewCount { get; set; } = 18;
        public string Description { get; set; } = "";
        public List<string> GalleryImages { get; set; } = new List<string>();
        
        // Detailed specs matching your design accordions
        public List<string> TechnicalSpecifications { get; set; } = new List<string>();
        public List<string> KeyFeatures { get; set; } = new List<string>();
        public List<Review> Reviews { get; set; } = new List<Review>();
    }

    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("🚀 Querying Orms Direct Native Shopify Endpoints with Rich Schema...");

            var categoryEndpoints = new Dictionary<string, string>
            {
                { "Cameras", "https://www.ormsdirect.co.za/collections/digital-cameras/products.json?limit=30" },
                { "Lenses", "https://www.ormsdirect.co.za/collections/camera-lenses/products.json?limit=30" },
                { "Lighting", "https://www.ormsdirect.co.za/collections/continuous-lighting/products.json?limit=30" },
                { "Accessories", "https://www.ormsdirect.co.za/collections/memory-cards/products.json?limit=30" }
            };

            var allProducts = new List<ProductDetail>();
            using var client = new HttpClient();
            client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");

            foreach (var category in categoryEndpoints)
            {
                Console.WriteLine($"🔍 Fetching JSON data for category [{category.Key}]...");

                try
                {
                    string jsonResponse = await client.GetStringAsync(category.Value);
                    JObject parsed = JObject.Parse(jsonResponse);
                    JArray? products = parsed["products"] as JArray;

                    if (products != null)
                    {
                        foreach (var prod in products)
                        {
                            string title = prod["title"]?.ToString() ?? "Unknown Product";
                            string handle = prod["handle"]?.ToString() ?? Guid.NewGuid().ToString();
                            string vendor = prod["vendor"]?.ToString() ?? "Professional Gear";

                            string rawPrice = prod["variants"]?[0]?["price"]?.ToString() ?? "0";
                            string formattedPrice = FormatSouthAfricanRand(rawPrice);

                            var imageGallery = new List<string>();
                            JArray? images = prod["images"] as JArray;
                            if (images != null)
                            {
                                foreach (var img in images)
                                {
                                    string? src = img["src"]?.ToString();
                                    if (!string.IsNullOrEmpty(src))
                                    {
                                        imageGallery.Add(src);
                                    }
                                }
                            }

                            if (imageGallery.Count == 0)
                            {
                                imageGallery.Add("https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80");
                            }

                            var (randomScore, randomCount) = GenerateRandomRating(title);
                            var reviews = GenerateMockReviews(title);
                            var (techSpecs, keyFeatures) = GenerateMockSpecsAndFeatures(category.Key, title);

                            var product = new ProductDetail
                            {
                                Id = handle,
                                Category = category.Key,
                                Brand = vendor,
                                Name = title,
                                Price = formattedPrice,
                                RatingScore = randomScore,
                                ReviewCount = randomCount,
                                Description = StripHtmlTags(prod["body_html"]?.ToString() ?? "Designed for extreme versatility and professional-grade performance."),
                                GalleryImages = imageGallery,
                                TechnicalSpecifications = techSpecs,
                                KeyFeatures = keyFeatures,
                                Reviews = reviews
                            };

                            allProducts.Add(product);
                        }

                        Console.WriteLine($"   -> Extracted {products.Count} products with rich schema for {category.Key}.");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"   -> Failed to fetch {category.Key}: {ex.Message}");
                }
            }

            string jsonOutput = JsonConvert.SerializeObject(allProducts, Formatting.Indented);
            string outputPath = Path.Combine(Directory.GetCurrentDirectory(), "products.json");
            await File.WriteAllTextAsync(outputPath, jsonOutput);

            Console.WriteLine($"\n💾 Enhanced dataset exported to: {outputPath}");
        }

        private static string FormatSouthAfricanRand(string rawPrice)
        {
            rawPrice = rawPrice?.Trim('"', ' ') ?? "0";
            if (decimal.TryParse(rawPrice, NumberStyles.Any, CultureInfo.InvariantCulture, out decimal numericPrice) && numericPrice > 0)
            {
                return $"R {numericPrice:N0}";
            }
            return "Price on Request";
        }

        private static (double score, int count) GenerateRandomRating(string seed)
        {
            int hash = Math.Abs(seed.GetHashCode());
            double[] scores = { 4.6, 4.7, 4.8, 4.9, 5.0 };
            double score = scores[hash % scores.Length];
            int count = (hash % 120) + 12;
            return (score, count);
        }

        private static List<Review> GenerateMockReviews(string seed)
        {
            return new List<Review>
            {
                new Review { Author = "David K.", IsVerified = true, Rating = 5, Comment = "Absolute powerhouse for hybrid shooters. Image quality and build are top tier." },
                new Review { Author = "Marcus Vance", IsVerified = true, Rating = 5, Comment = "The color science and ergonomics are unmatched. Autofocus nails sharp eyes every time." },
                new Review { Author = "Elena Rostova", IsVerified = true, Rating = 4, Comment = "Exceptional photo quality. Felt natural in my hands from minute one." },
                new Review { Author = "Liam O'Connor", IsVerified = true, Rating = 5, Comment = "Perfect travel companion without compromising quality. Delivers tack-sharp output." },
                new Review { Author = "Sarah Jenkins", IsVerified = true, Rating = 5, Comment = "A massive upgrade for commercial portraiture and street work. EVF resolution is crisp and bright." }
            };
        }

        private static (List<string> specs, List<string> features) GenerateMockSpecsAndFeatures(string category, string title)
        {
            var specs = new List<string>
            {
                "24-600mm Ultra-Telephoto Zeiss Lens — F2.4-4 large-aperture optics deliver incredible background bokeh.",
                "20.1 MP Stacked CMOS Sensor — Enables 14fps high-speed continuous shooting and ultra-fast readout speeds.",
                "4K Movie Recording & Super Slow Motion — Direct pixel readout without pixel binning for high-resolution 4K video.",
                "Fast Intelligent Autofocus — High-speed contrast-detection AF achieves lock-on in as fast as 0.09 seconds.",
                "Optical SteadyShot™ Stabilization — Built-in image stabilization provides up to 4.5 stops of compensation."
            };

            var features = new List<string>
            {
                "Sensor Type: 1.0-type (13.2mm x 8.8mm) Exmor RS CMOS",
                "Effective Pixels: Approx. 20.1 Megapixels",
                "Focal Length: f=8.8-220mm (35mm equivalent: 24-600mm)",
                "Optical Zoom: 25x",
                "Maximum Aperture: f/2.4 (Wide) - f/4.0 (Telephoto)",
                "ISO Sensitivity: Auto, ISO 100-12800",
                "Shutter Speed: Anti-Distortion Shutter up to 1/32000 sec",
                "Viewfinder: 0.39-type XGA OLED Tru-Finder",
                "Display: 3.0-inch tiltable TFT LCD (1,228,800 dots)",
                "Connectivity: Wi-Fi, NFC, Micro-HDMI, 3.5mm Mic Input",
                "Weight: Approx. 1095g / 38.6 oz"
            };

            return (specs, features);
        }

        private static string StripHtmlTags(string input)
        {
            if (string.IsNullOrEmpty(input)) return "";
            return System.Text.RegularExpressions.Regex.Replace(input, "<.*?>", string.Empty).Trim();
        }
    }
}