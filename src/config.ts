// Edit the values below. Everything on the site reads from here.
export const site = {
  name: "Bible Believers Christ Church",
  short: "BBCC",
  phone: "+254-748-390-940",
  whatsapp: "254748390940",
  paybill: { business: "Bible believes christ church", number: "400200", account: "1136158" },
  // PayPal.me username (paypal.me/YourName). Replace with the church's real one.
  paypalUser: "YOUR_PAYPAL_USERNAME",
  // Free form service, e.g. create a form at formspree.io or web3forms.com and paste its URL here.
  formEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
  location: "Kenya and around the world",
  services: "Sundays. Call us for service times.",
};
// Photos live in public/img. If a photo is missing, that person simply shows without one.
// Hero background video: served from public/video/hero.mp4 (no external link). To change it, replace that file.
export const heroVideo = "/video/hero.mp4";

export const staff = [
  { name: "Peter Milimo", role: "Lead Pastor", img: "Peter Milimo_ Lead Pastor.png", pos: "50% 25%" },
  { name: "Felix Matuvwi", role: "Youth Pastor and Secretary General", img: "Felix Matuvwi Yourth pastor and the secrtary general.jpg", pos: "50% 25%" },
  { name: "Lawrence Odada", role: "Pastor, Church Planting, Nyanza Region", img: "LAWRANCE ODADA _ Pastor church planting Nyanza Region.jpg", pos: "50% 30%" },
  { name: "Judith Kanini", role: "Chairlady and Family Counselor", img: "Judith Kanini chairlady and family counciler.jpg", pos: "50% 30%" },
  { name: "Harriet Karemi", role: "Sunday School Director", img: "Harriet Karemi sunday school director.jpg", pos: "50% 30%" },
];

// Books by Pastor Peter Milimo (details from petermilimo.org). Books are paid to a separate account from church giving.
export const bookInfo = { author: "Peter Milimo", price: "KSh 1,200", format: "Softcopy (PDF / eBook)", email: "biblebcc@gmail.com", paybill: "400200", account: "1169454", accountName: "Peter M. Kisiangani" };
export const books = [
  { cat: "Single parenting & family", title: "When One Becomes Both", sub: "How Single Parents Rise, Heal and Build Strong Families Against All Odds", cover: "linear-gradient(160deg,#8c6d4b,#3a2c1c)",
    desc: "A powerful, compassionate guide for single parents navigating the journey of raising a family alone, covering healing, resilience, identity, and building a home that thrives against every odd." },
  { cat: "Marriage & family", title: "The Thirteen Effective Pillars of a Covenant Marriage", sub: "A Biblical Guide for Building a Strong, Faithful & Divorce-Resistant Union", cover: "linear-gradient(160deg,#574530,#2b2116)",
    desc: "An in-depth biblical roadmap through thirteen essential pillars every covenant marriage must stand on, equipping couples to build a strong, faithful, and divorce-resistant union grounded in God’s Word." },
];
