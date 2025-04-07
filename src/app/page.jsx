"use client";
import React, { useState, useEffect } from 'react';

function MainComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [counter, setCounter] = useState(200);
  const targetNumber = 30999;
  const duration = 5500;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let animationFrameId;
    let startTime;
    let isAnimating = false;

    const animateCounter = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < duration) {
        const nextValue = Math.min(
          Math.floor((progress / duration) * targetNumber),
          targetNumber
        );
        setCounter(nextValue);
        animationFrameId = requestAnimationFrame(animateCounter);
      } else {
        setCounter(targetNumber);
        isAnimating = false;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isAnimating) {
          isAnimating = true;
          startTime = null;
          setCounter(200);
          animationFrameId = requestAnimationFrame(animateCounter);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById("counter-section");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [targetNumber, duration]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const products = [
    {
      name: "Açaí 10L",
      price: "R$ 79,99",
      description: "Promoção de Lançamento",
      image: "/acai-10l.jpg",
    },
    {
      name: "Açaí Premium",
      price: "Sob consulta",
      description: "Para revenda",
      image: "/acai-premium.jpg",
    },
    {
      name: "Mix de Frutas",
      price: "Sob consulta",
      description: "Complementos",
      image: "/mix-frutas.jpg",
    },
  ];

  const locations = [
    {
      name: "Loja 1 - São Miguel Paulista",
      address: "Rua Principal, 123 - SP",
      phone: "(11) 99999-9999",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed w-full bg-[#4C1D95] text-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold font-inter">
                Açaí Everest
              </span>
            </div>

            <div className="hidden md:flex space-x-8">
              <a href="#produtos" className="hover:text-purple-200 font-inter">
                Produtos
              </a>
              <a href="#sobre" className="hover:text-purple-200 font-inter">
                Quem Somos
              </a>
              <a href="#locais" className="hover:text-purple-200 font-inter">
                Onde Retirar
              </a>
            </div>

            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center space-x-2 bg-green-600 px-4 py-2 rounded-md hover:bg-green-700"
            >
              <i className="fab fa-whatsapp text-xl"></i>
              <span>WhatsApp</span>
            </a>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i
                className={`fas ${
                  isMenuOpen ? "fa-times" : "fa-bars"
                } text-white`}
              ></i>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#produtos"
                className="block px-3 py-2 hover:text-purple-200 font-inter"
              >
                Produtos
              </a>
              <a
                href="#sobre"
                className="block px-3 py-2 hover:text-purple-200 font-inter"
              >
                Quem Somos
              </a>
              <a
                href="#locais"
                className="block px-3 py-2 hover:text-purple-200 font-inter"
              >
                Onde Retirar
              </a>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16">
        <section className="relative h-[500px]">
          <img
            src=""
            alt=""
            className={`w-full h-full object-cover transition-transform duration-700 ${
              scrollY > 0 ? "scale-105" : "scale-100"
            }`}
          />
          <div
            className={`absolute inset-0 bg-black/50 flex items-center ${
              scrollY > 100 ? "opacity-0" : "opacity-100"
            } transition-opacity duration-500`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white font-inter mb-4">
                Distribuidor Oficial Açaí Everest
              </h1>
              <p className="text-xl text-white font-inter mb-8">
                Qualidade e preço justo para seu negócio
              </p>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors font-inter"
              >
                <i className="fab fa-whatsapp text-xl"></i>
                <span>Faça seu Pedido</span>
              </a>
            </div>
          </div>
        </section>

        <section id="counter-section" className="py-16 bg-[#4C1D95] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-8">
                Números que Impressionam
              </h2>
              <div className="text-6xl font-bold mb-4">{counter}+</div>
              <p className="text-xl">Clientes Satisfeitos</p>
            </div>
          </div>
        </section>

        <section id="produtos" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 font-inter mb-12 text-center">
              Nossos Produtos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.name}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 font-inter mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <p className="text-2xl text-[#4C1D95] font-bold font-inter">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="sobre" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 font-inter mb-8">
                Por que escolher o Açaí Everest?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="transform transition-transform hover:scale-105">
                  <div className="w-16 h-16 bg-[#4C1D95] rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-medal text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Qualidade Premium</h3>
                  <p className="text-gray-600">
                    Açaí puro e cremoso, direto da Amazônia
                  </p>
                </div>
                <div className="transform transition-transform hover:scale-105">
                  <div className="w-16 h-16 bg-[#4C1D95] rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-truck text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Entrega Garantida</h3>
                  <p className="text-gray-600">
                    Entregamos em São Paulo e região
                  </p>
                </div>
                <div className="transform transition-transform hover:scale-105">
                  <div className="w-16 h-16 bg-[#4C1D95] rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-handshake text-2xl text-white"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Suporte ao Cliente</h3>
                  <p className="text-gray-600">Atendimento personalizado</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="locais" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 font-inter mb-12 text-center">
              Onde Retirar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {locations.map((location) => (
                <div
                  key={location.name}
                  className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
                >
                  <h3 className="text-xl font-bold mb-2">{location.name}</h3>
                  <p className="text-gray-600 mb-2">{location.address}</p>
                  <p className="text-gray-600">{location.phone}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#4C1D95] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white font-inter mb-8">
                Pronto para começar?
              </h2>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition-colors font-inter"
              >
                <i className="fab fa-whatsapp text-xl"></i>
                <span>Fale Conosco no WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="font-inter">
              © 2025 Açaí Everest. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#4C1D95] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-800 transition-colors"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
}

export default MainComponent;