import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Star, Gift, Truck, Shield } from 'lucide-react';
import './sweet-gifts.css';

export default function SweetGifts() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [glazeProgress, setGlazeProgress] = useState({});

  const heroImages = [
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1599599810694-b5ef4e78e371?w=800&h=600&fit=crop'
  ];

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Track glaze progress for feature cards
  useEffect(() => {
    const handleScroll = () => {
      const featuresElement = document.querySelector('.sg-features');
      
      if (!featuresElement) return;
      
      const cards = featuresElement.querySelectorAll('.sg-feature-card');
      const newProgress = {};
      
      cards.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        const cardTop = rect.top;
        const cardHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Заливка начинается когда карточка полностью видна и заканчивается когда начинает скрываться сверху
        if (cardTop < windowHeight && cardTop + cardHeight > 0) {
          // Прогресс: 0 когда карточка внизу, 1 когда начинает скрываться вверху
          const progress = Math.max(0, Math.min(1, (windowHeight - cardTop) / (windowHeight + cardHeight * 0.5)));
          newProgress[idx] = progress;
        } else {
          newProgress[idx] = cardTop + cardHeight <= 0 ? 1 : 0;
        }
      });
      
      setGlazeProgress(newProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { id: 'all', name: 'Все товары' },
    { id: 'chocolate', name: 'Шоколад' },
    { id: 'sweets', name: 'Конфеты' },
    { id: 'sets', name: 'Подарочные наборы' },
    { id: 'premium', name: 'Premium' }
  ];

  const products = [
    // Chocolate
    { id: 1, category: 'chocolate', name: 'Премиум шоколад 70% какао', price: '2890 тг', image: 'https://gotovim-doma.ru/images/recipe/b/af/baf2768627113c478f2fd1ef6d070515.jpg', rating: 4.8, reviews: 234 },
    { id: 2, category: 'chocolate', name: 'Бельгийский шоколад ассорти', price: '3490 тг', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop', rating: 4.9, reviews: 156 },
    { id: 3, category: 'chocolate', name: 'Чёрный шоколад с миндалём', price: '2490 тг', image: 'https://masterpiecer-images.s3.yandex.net/ff2afcefad2c11ee88e1260d35446c60:upscaled', rating: 4.7, reviews: 312 },
    
    // Sweets
    { id: 4, category: 'sweets', name: 'Мармеладки фруктовые', price: '1890 тг', image: 'https://baking-academy.ru/upload/iblock/397/39791d4f139eb5aca508ef01080e9123.jpg', rating: 4.6, reviews: 189 },
    { id: 5, category: 'sweets', name: 'Карамель ручной работы', price: '2190 тг', image: 'https://pbs72.ru/upload/medialibrary/1b7/1b7053249c623cf37dad3e0cba6d8045.JPG', rating: 4.8, reviews: 201 },
    { id: 6, category: 'sweets', name: 'Леденцы на палочке', price: '1490 тг', image: 'https://i.ytimg.com/vi/PdbZ5-P-Z6I/maxresdefault.jpg', rating: 4.5, reviews: 145 },
    
    // Gift Sets
    { id: 7, category: 'sets', name: 'Премиум подарочный набор', price: '5890 тг', image: 'https://img.freepik.com/premium-photo/gift-set-desserts-red-velvet-bento-cake-red-velvet-cupcakes-with-strawberries_166262-1500.jpg', rating: 4.9, reviews: 423 },
    { id: 8, category: 'sets', name: 'Набор "Сладкий вечер"', price: '4290 тг', image: 'https://cadouri.md/4289-large_default/podarocnaa-korzina-sladkie-vecera.jpg', rating: 4.8, reviews: 267 },
    { id: 9, category: 'sets', name: 'Подарок "Шоколадный рай"', price: '6490 тг', image: 'https://lulu.kiev.ua/wp-content/uploads/77d79c4e4c5dae475714311ea03e7a09.jpg', rating: 4.9, reviews: 389 },
    
    // Premium
    { id: 10, category: 'premium', name: 'Люкс набор "Golden Delight"', price: '12990 тг', image: 'https://content2.flowwow-images.com/data/flowers/1000x1000/56/1686050992_57008256.jpg', rating: 5.0, reviews: 98 },
    { id: 11, category: 'premium', name: 'Эксклюзивный шоколад ручной работы', price: '8990 тг', image: 'https://i.pinimg.com/474x/e1/6a/f5/e16af5bdb928195abbe55169e6396277.jpg', rating: 5.0, reviews: 67 }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const features = [
    { icon: Gift, title: 'Красивая упаковка', desc: 'Каждый подарок упакован с любовью и элегантностью' },
    { icon: Truck, title: 'Быстрая доставка', desc: 'Доставка по городу в течение 2-4 часов' },
    { icon: Shield, title: 'Гарантия качества', desc: 'Все продукты свежие и высочайшего качества' }
  ];

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]);
  };

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const cartTotal = cart.reduce((sum, item) => {
    const price = parseInt(item.price.split(' ')[0]);
    return sum + price;
  }, 0);

  return (
    <div className="sweet-gifts" style={{ '--scroll-progress': `${scrollProgress}%` }}>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur>
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7" result="goo"></feColorMatrix>
            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
          </filter>
        </defs>
      </svg>
      
      {/* Header */}
      <header className="sg-header">
        <div className="sg-container">
          <div className="sg-logo">Sweet & Gifts</div>
          <nav className="sg-nav">
            <a href="#home">Главная</a>
            <a href="#products">Товары</a>
            <a href="#about">О нас</a>
            <a href="#contact">Контакты</a>
          </nav>
          <div className="sg-header-actions">
            <button className="sg-cart-btn" onClick={() => setShowCart(!showCart)}>
              <ShoppingCart size={22} />
              {cart.length > 0 && <span className="sg-badge">{cart.length}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="sg-hero">
        {/* Image Carousel */}
        <div className="sg-hero-carousel">
          {heroImages.map((image, idx) => (
            <div
              key={idx}
              className={`sg-carousel-slide ${idx === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
          <div className="sg-carousel-overlay"></div>
        </div>

        <div className="sg-container sg-hero-content">
          <div className="sg-hero-text">
            <h1 className="sg-hero-title">Сладкие моменты жизни</h1>
            <p className="sg-hero-subtitle">Подарочные наборы сладостей и деликатесов для ваших близких</p>
            <button className="sg-btn-primary">Перейти к товарам</button>
          </div>
        </div>

        {/* Frosting Flow Effect */}
        <div className="sg-frosting-flow"></div>

        {/* Slide Indicators */}
        <div className="sg-slide-indicators">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              className={`sg-indicator ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="sg-features">
        <div className="sg-container">
          <div className="sg-features-grid">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={idx} 
                  className="sg-feature-card"
                  style={{ '--glaze-progress': glazeProgress[idx] || 0 }}
                >
                  <div className="sg-feature-card__glaze">
                    <div className="sg-feature-card__glaze-blobs">
                      <span className="sg-feature-card__blob"></span>
                      <span className="sg-feature-card__blob"></span>
                      <span className="sg-feature-card__blob"></span>
                      <span className="sg-feature-card__blob"></span>
                      <span className="sg-feature-card__blob"></span>
                      <span className="sg-feature-card__blob"></span>
                      <span className="sg-feature-card__blob"></span>
                      <span className="sg-feature-card__blob"></span>
                      <span className="sg-feature-card__blob"></span>
                      <span className="sg-feature-card__blob"></span>
                      <span className="sg-feature-card__blob"></span>
                      <span className="sg-feature-card__blob"></span>
                    </div>
                  </div>
                  <div className="sg-feature-icon">
                    <Icon size={32} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="sg-categories">
        <div className="sg-container">
          <h2 className="sg-section-title">Каталог</h2>
          <div className="sg-category-tabs">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`sg-tab ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="sg-products">
        <div className="sg-container">
          <div className="sg-products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="sg-product-card">
                <div className="sg-product-image">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  <button
                    className="sg-wishlist-btn"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart 
                      size={20} 
                      fill={wishlist.includes(product.id) ? 'currentColor' : 'none'}
                      color={wishlist.includes(product.id) ? '#E11D48' : '#D1D5DB'}
                    />
                  </button>
                </div>
                <div className="sg-product-info">
                  <h3 className="sg-product-name">{product.name}</h3>
                  <div className="sg-product-rating">
                    <div className="sg-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14}
                          fill={i < Math.floor(product.rating) ? '#FCD34D' : '#E5E7EB'}
                          color={i < Math.floor(product.rating) ? '#FCD34D' : '#E5E7EB'}
                        />
                      ))}
                    </div>
                    <span className="sg-reviews">({product.reviews})</span>
                  </div>
                  <div className="sg-product-footer">
                    <span className="sg-price">{product.price}</span>
                    <button 
                      className="sg-btn-add"
                      onClick={() => addToCart(product)}
                    >
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="sg-promo">
        <div className="sg-container">
          <div className="sg-promo-content">
            <h2>Подари сладкие эмоции</h2>
            <p>Каждый подарок упакован с вкусом и любовью. Получи скидку 10% на первый заказ!</p>
            <button className="sg-btn-secondary">Узнать больше</button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="sg-newsletter">
        <div className="sg-container">
          <h2>Подпишитесь на новости</h2>
          <p>Будьте первыми, кто узнает о новых товарах и эксклюзивных предложениях</p>
          <div className="sg-newsletter-form">
            <input type="email" placeholder="Введите ваш email" />
            <button className="sg-btn-subscribe">Подписаться</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="sg-footer">
        <div className="sg-container">
          <div className="sg-footer-grid">
            <div>
              <h3>Sweet & Gifts</h3>
              <p>Премиальные подарочные наборы сладостей и деликатесов для всех случаев жизни.</p>
            </div>
            <div>
              <h4>Компания</h4>
              <ul>
                <li><a href="#about">О нас</a></li>
                <li><a href="#blog">Блог</a></li>
                <li><a href="#careers">Карьера</a></li>
              </ul>
            </div>
            <div>
              <h4>Покупателям</h4>
              <ul>
                <li><a href="#delivery">Доставка</a></li>
                <li><a href="#returns">Возврат</a></li>
                <li><a href="#faq">Вопросы и ответы</a></li>
              </ul>
            </div>
            <div>
              <h4>Контакты</h4>
              <p>info@sweetgifts.com</p>
              <p>+7 (777) 123-45-67</p>
            </div>
          </div>
          <div className="sg-footer-bottom">
            <p>&copy; 2024 Sweet & Gifts. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="sg-cart-overlay" onClick={() => setShowCart(false)}>
          <div className="sg-cart-panel" onClick={e => e.stopPropagation()}>
            <div className="sg-cart-header">
              <h2>Корзина</h2>
              <button className="sg-close-btn" onClick={() => setShowCart(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <p className="sg-cart-empty">Ваша корзина пуста</p>
            ) : (
              <>
                <div className="sg-cart-items">
                  {cart.map(item => (
                    <div key={item.cartId} className="sg-cart-item">
                      <img src={item.image} alt={item.name} />
                      <div className="sg-cart-item-info">
                        <h4>{item.name}</h4>
                        <p>{item.price}</p>
                      </div>
                      <button 
                        className="sg-remove-btn"
                        onClick={() => removeFromCart(item.cartId)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div className="sg-cart-total">
                  <span>Итого:</span>
                  <strong>{cartTotal} тг</strong>
                </div>
                <button className="sg-btn-checkout">Оформить заказ</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}