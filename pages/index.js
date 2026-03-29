import Head from "next/head";
import { useMemo, useState } from "react";
import { products } from "../data/products";

const siteUrl = "https://appscrip-task-candidate.netlify.app";
const sortOptions = [
  "RECOMMENDED",
  "NEWEST FIRST",
  "POPULAR",
  "PRICE : HIGH TO LOW",
  "PRICE : LOW TO HIGH"
];

const sidebarFilters = [
  { title: "CUSTOMIZBLE", values: [] },
  { title: "IDEAL FOR", values: ["All", "Men", "Women", "Baby & Kids"] },
  { title: "OCCASION", values: ["All"] },
  { title: "WORK", values: ["All"] },
  { title: "FABRIC", values: ["All"] },
  { title: "SEGMENT", values: ["All"] },
  { title: "SUITABLE FOR", values: ["All"] },
  { title: "RAW MATERIALS", values: ["All"] }
];

const catalogProducts = products;

function sortProducts(items, sortMode) {
  const sorted = [...items];

  switch (sortMode) {
    case "PRICE : HIGH TO LOW":
      sorted.sort((a, b) => b.price - a.price);
      return sorted;
    case "PRICE : LOW TO HIGH":
      sorted.sort((a, b) => a.price - b.price);
      return sorted;
    case "POPULAR":
      sorted.sort((a, b) => b.reviews - a.reviews);
      return sorted;
    case "NEWEST FIRST":
      return sorted.reverse();
    default:
      sorted.sort((a, b) => b.rating - a.rating);
      return sorted;
  }
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <button type="button" className="product-card-button">
        <div className="product-art">
          <img src={product.image} alt={product.alt} className="product-art-image" loading="lazy" />
        </div>
        <div className="product-copy">
          <div>
            <p className="product-name">{product.name}</p>
            <p className="product-note">Sign in or Create an account to see pricing</p>
          </div>
          <span className="product-heart" aria-hidden="true">
            o
          </span>
        </div>
      </button>
    </article>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortMode, setSortMode] = useState("RECOMMENDED");

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    []
  );

  const filteredProducts = useMemo(() => {
    const baseItems =
      activeCategory === "All"
        ? catalogProducts
        : catalogProducts.filter((product) => product.category === activeCategory);

    return sortProducts(baseItems, sortMode);
  }, [activeCategory, sortMode]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Metta Muse Inspired Product Listing Page",
    description: "Responsive product listing page inspired by the provided Figma design.",
    url: siteUrl
  };

  return (
    <>
      <Head>
        <title>Discover Our Products</title>
        <meta
          name="description"
          content="A Figma-inspired product listing page with a luxury header, sidebar filters, product grid, and rich dark footer."
        />
        <meta property="og:title" content="Discover Our Products" />
        <meta
          property="og:description"
          content="Responsive storefront recreation based on the provided Figma product listing design."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <link rel="canonical" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <main className="page">
        <header className="site-header">
          <div className="header-strip">
            <div className="mini-logo" aria-hidden="true" />
            <div className="site-logo">LOGO</div>
            <div className="header-icons" aria-label="User actions">
              <span>Search</span>
              <span>Wish</span>
              <span>Bag</span>
              <span>User</span>
              <span className="lang-chip">ENG</span>
            </div>
          </div>

          <nav className="main-nav" aria-label="Primary">
            <a href="#shop">SHOP</a>
            <a href="#skills">SKILLS</a>
            <a href="#stories">STORIES</a>
            <a href="#about">ABOUT</a>
            <a href="#contact">CONTACT US</a>
          </nav>

          <section className="hero-block">
            <h1>DISCOVER OUR PRODUCTS</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
              scelerisque. Dolor integer scelerisque nibh amet mi ut elementum dolor.
            </p>
          </section>
        </header>

        <section className="catalog-wrap" id="shop">
          <div className="catalog-toolbar">
            <div className="toolbar-left">
              <span className="items-count">{filteredProducts.length} ITEMS</span>
              <button type="button" className="toggle-filter">
                HIDE FILTER
              </button>
            </div>

            <div className="toolbar-right">
              <div className="category-pills" aria-label="Category filters">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={category === activeCategory ? "category-pill is-active" : "category-pill"}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <label className="sort-select">
                <span>RECOMMENDED</span>
                <select value={sortMode} onChange={(event) => setSortMode(event.target.value)}>
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="catalog-layout">
            <aside className="filter-sidebar">
              {sidebarFilters.map((section) => (
                <div key={section.title} className="filter-section">
                  <div className="filter-head">
                    <h2>{section.title}</h2>
                    <span>+</span>
                  </div>
                  {section.values.length > 0 && (
                    <div className="filter-values">
                      {section.values.map((value) => (
                        <button
                          key={`${section.title}-${value}`}
                          type="button"
                          className={value === activeCategory ? "filter-value is-active" : "filter-value"}
                          onClick={() => {
                            if (categories.includes(value)) {
                              setActiveCategory(value);
                            }
                          }}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </aside>

            <section className="product-grid" aria-label="Product listing">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </section>
          </div>
        </section>

        <footer className="site-footer" id="contact">
          <section className="footer-top">
            <div className="newsletter">
              <p className="footer-heading">BE THE FIRST TO KNOW</p>
              <p className="footer-copy">Sign up for updates from metta muse.</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Enter your e-mail..." aria-label="Email address" />
                <button type="button">SUBSCRIBE</button>
              </form>
            </div>

            <div className="footer-contact">
              <p className="footer-heading">CONTACT US</p>
              <p className="footer-copy">+44 221 133 5360</p>
              <p className="footer-copy">customercare@mettamuse.com</p>

              <p className="footer-heading currency-heading">CURRENCY</p>
              <p className="footer-copy">USD</p>
              <p className="footer-small">
                Transactions will be completed in Euros and a currency reference is available on hover.
              </p>
            </div>
          </section>

          <section className="footer-bottom">
            <div>
              <h2 className="footer-brand">metta muse</h2>
              <ul className="footer-list">
                <li>About Us</li>
                <li>Stories</li>
                <li>Artisans</li>
                <li>Boutiques</li>
                <li>Contact Us</li>
                <li>EU Compliance Docs</li>
              </ul>
            </div>

            <div>
              <p className="footer-heading">QUICK LINKS</p>
              <ul className="footer-list">
                <li>Orders & Shipping</li>
                <li>Join/Login as a Seller</li>
                <li>Payment & Pricing</li>
                <li>Return & Refunds</li>
                <li>FAQs</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>

            <div>
              <p className="footer-heading">FOLLOW US</p>
              <div className="social-icons">
                <span>IG</span>
                <span>IN</span>
              </div>

              <p className="footer-heading payments-heading">metta muse ACCEPTS</p>
              <div className="payment-row">
                <span>GPay</span>
                <span>Mastercard</span>
                <span>PayPal</span>
                <span>Amex</span>
                <span>Apple Pay</span>
              </div>
            </div>
          </section>

          <p className="copyright">Copyright (c) 2023 mettamuse. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
