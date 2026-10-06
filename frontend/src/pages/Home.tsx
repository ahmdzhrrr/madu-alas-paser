import { useEffect, useState } from "react";
import { api } from "../services/api";

import Navbar from "../components/Navbar";
import About from "../components/About";
import Features from "../components/Features";
import FeaturedProducts from "../components/Featuredproducts";
import Carousel from "../components/Carousel";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

export default function Home() {

  const [setting, setSetting] =
    useState<any>(null);

  useEffect(() => {

    api
      .get("/settings")
      .then((res) => {
        setSetting(res.data);
      })
      .catch(console.error);

  }, []);

  return (
    <>
      <Navbar />
      <Carousel />
      <About setting={setting} />
      <Features setting={setting} />
      <FeaturedProducts />
      <Testimonials />
      <Footer />
    </>
  );
}