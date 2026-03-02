import React, { useState } from 'react';
import { MapPin, Phone, Mail, Users, Star, Calendar, DollarSign, Home } from 'lucide-react';
import './tourism-agency.css';

export default function TourismAgency() {
  const [hoveredRoom, setHoveredRoom] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const rooms = [
    {
      id: 1,
      name: 'Стандарт',
      description: 'Комфортабельный номер с видом на город',
      image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
      beds: 1,
      area: 32,
      price: 150,
      amenities: ['Кондиционер', 'WiFi', 'Телевизор', 'Ванная комната', 'Мини-бар'],
      features: 'Просторный номер с современным ремонтом. Идеален для деловых путешественников и туристов, желающих насладиться комфортом по доступной цене.'
    },
    {
      id: 2,
      name: 'Делюкс',
      description: 'Люксовый номер с панорамным видом',
      image: 'https://lh6.googleusercontent.com/proxy/6OhJItmzEIAjri6zMKDXoEjAqbztL_oXUL5GAtEZ6C-QtXIniFwE7H321_sX7tbu1AQvS_NGpK9kU4YItLlnV3aTTFi5jqyZfBSsa3TOQ2c',
      beds: 2,
      area: 45,
      price: 250,
      amenities: ['Кондиционер', 'WiFi', 'Телевизор', 'Балкон', 'Гидромассаж'],
      features: 'Просторный номер с панорамным видом на город. Оборудован всем необходимым для комфортного отдыха.'
    },
    {
      id: 3,
      name: 'Президентский люкс',
      description: 'Элитный номер высочайшего класса',
      image: 'https://calista.com.tr/media/kotjxemb/calista-resort-presidential-suite-antalya-belek-large-image-1.jpg',
      beds: 3,
      area: 65,
      price: 450,
      amenities: ['Люкс-ванная', 'Гостиная', 'WiFi', 'Терраса', 'Консьерж'],
      features: 'Элитный номер с роскошным интерьером. Расположен на верхних этажах с захватывающим видом на город.'
    }
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = () => {
    if (formData.name && formData.email && formData.phone) {
      alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setShowContactForm(false);
    }
  };

  return (
    <div className="tourism-container">
      {/* Header */}
      <header className="tourism-header">
        <div className="tourism-header-content">
          <div className="tourism-logo">
            <MapPin size={32} className="logo-icon" />
            <span>TraveLink</span>
          </div>
          <nav className="tourism-nav">
            <a href="#about">О нас</a>
            <a href="#rooms">Номера</a>
            <a href="#services">Услуги</a>
            <button 
              className="nav-cta-btn"
              onClick={() => setShowContactForm(true)}
            >
              Связаться
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="tourism-hero">
        <div className="hero-content">
          <h1 className="hero-title">Откройте мир путешествий</h1>
          <p className="hero-subtitle">Премиум путевки в лучшие отели мира</p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">2500+</div>
              <div className="stat-label">Довольных клиентов</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">180+</div>
              <div className="stat-label">Стран по миру</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Лет опыта</div>
            </div>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* About Section */}
      <section id="about" className="tourism-about">
        <div className="about-container">
          <div className="about-text">
            <h2>О нашем агентстве</h2>
            <p>
              TraveLink - это ведущее туристическое агентство, специализирующееся на организации 
              премиум-туров по всему миру. Мы работаем с лучшими отелями, авиалиниями и турагентствами 
              для обеспечения вам незабываемого опыта путешествия.
            </p>
            <p>
              Наша команда профессионалов с 15-летним опытом готова помочь вам спланировать идеальный отпуск, 
              учтя все ваши пожелания и особые требования.
            </p>
            <div className="about-features">
              <div className="feature-item">
                <Star size={20} />
                <span>Премиум сервис</span>
              </div>
              <div className="feature-item">
                <Users size={20} />
                <span>Личный ассистент</span>
              </div>
              <div className="feature-item">
                <DollarSign size={20} />
                <span>Лучшие цены</span>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="image-placeholder">
              <MapPin size={80} />
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="tourism-rooms">
        <div className="rooms-header">
          <h2>Категории номеров</h2>
          <p>Выберите идеальный вариант для вашего отдыха</p>
        </div>
        <div className="rooms-grid">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="room-card"
              onMouseEnter={() => setHoveredRoom(room.id)}
              onMouseLeave={() => setHoveredRoom(null)}
            >
              <div className="room-image-container">
                <img 
                  src={room.image} 
                  alt={room.name}
                  className="room-image"
                />
                <div className="room-overlay">
                  <button className="room-details-btn">Подробнее</button>
                </div>
              </div>
              <div className="room-content">
                <h3>{room.name}</h3>
                <p className="room-desc">{room.description}</p>
                
                <div className="room-specs">
                  <div className="spec">
                    <Home size={16} />
                    <span>{room.area} м²</span>
                  </div>
                  <div className="spec">
                    <Users size={16} />
                    <span>{room.beds} кровать</span>
                  </div>
                </div>

                <div className="room-features">
                  <p className="feature-title">Удобства:</p>
                  <div className="amenities-list">
                    {room.amenities.map((amenity, idx) => (
                      <span key={idx} className="amenity-tag">{amenity}</span>
                    ))}
                  </div>
                </div>

                {hoveredRoom === room.id && (
                  <div className="room-full-info">
                    <p className="feature-description">{room.features}</p>
                  </div>
                )}

                <div className="room-footer">
                  <div className="room-price">
                    <span className="price">${room.price}</span>
                    <span className="period">/ночь</span>
                  </div>
                  <button 
                    className="book-btn"
                    onClick={() => setShowContactForm(true)}
                  >
                    Забронировать
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="tourism-services">
        <h2>Наши услуги</h2>
        <div className="services-grid">
          <div className="service-card">
            <Calendar size={40} />
            <h3>Планирование маршрута</h3>
            <p>Мы создаем индивидуальные маршруты, учитывая ваши интересы и пожелания</p>
          </div>
          <div className="service-card">
            <MapPin size={40} />
            <h3>Трансфер и экскурсии</h3>
            <p>Профессиональный трансфер и увлекательные экскурсии по местным достопримечательностям</p>
          </div>
          <div className="service-card">
            <Phone size={40} />
            <h3>24/7 поддержка</h3>
            <p>Круглосуточное сопровождение во время путешествия и помощь при любых ситуациях</p>
          </div>
          <div className="service-card">
            <Star size={40} />
            <h3>VIP обслуживание</h3>
            <p>Эксклюзивный доступ в премиум-заведения и специальные предложения</p>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {showContactForm && (
        <div className="modal-overlay" onClick={() => setShowContactForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setShowContactForm(false)}
            >
              ×
            </button>
            <h2>Свяжитесь с нами</h2>
            <form className="contact-form">
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={handleFormChange}
                className="form-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleFormChange}
                className="form-input"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Телефон"
                value={formData.phone}
                onChange={handleFormChange}
                className="form-input"
              />
              <textarea
                name="message"
                placeholder="Ваше сообщение"
                value={formData.message}
                onChange={handleFormChange}
                className="form-textarea"
                rows="4"
              ></textarea>
              <button
                type="button"
                className="submit-btn"
                onClick={handleFormSubmit}
              >
                Отправить
              </button>
            </form>
            <div className="contact-info">
              <div className="info-item">
                <Phone size={16} /> +7 (999) 123-45-67
              </div>
              <div className="info-item">
                <Mail size={16} /> info@travelink.com
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="tourism-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>О компании</h4>
            <p>TraveLink - ваш верный спутник в мире путешествий</p>
          </div>
          <div className="footer-section">
            <h4>Контакты</h4>
            <p>Телефон: +7 (999) 123-45-67</p>
            <p>Email: info@travelink.com</p>
          </div>
          <div className="footer-section">
            <h4>Часы работы</h4>
            <p>Пн-Пт: 09:00 - 18:00</p>
            <p>Сб-Вс: 10:00 - 16:00</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 TraveLink. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
