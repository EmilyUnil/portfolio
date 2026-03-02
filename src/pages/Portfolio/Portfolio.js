import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Portfolio.css';

const ProjectIcon = ({ type }) => {
  const icons = {
    shop: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M8 16h32M10 16v20c0 2 1 4 3 4h22c2 0 3-2 3-4V16M16 16V12c0-2 2-4 4-4h8c2 0 4 2 4 4v4M20 24v8M28 24v8" 
              stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    booking: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M8 12h32c2 0 4 2 4 4v24c0 2-2 4-4 4H8c-2 0-4-2-4-4V16c0-2 2-4 4-4Z" 
              stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14 8v8M34 8v8M8 24h32" 
              stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    social: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <circle cx="12" cy="12" r="8" stroke="#3b82f6" strokeWidth="2"/>
        <circle cx="36" cy="12" r="8" stroke="#3b82f6" strokeWidth="2"/>
        <circle cx="24" cy="32" r="8" stroke="#3b82f6" strokeWidth="2"/>
        <path d="M18 18l6 10M30 18l-6 10" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  };
  return icons[type] || icons.shop;
};

export default function Portfolio() {
  const [hoveredProject, setHoveredProject] = useState(null);
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      title: "Цветочный магазин 'Floral Haven'",
      description: "Интернет-магазин с каталогом цветов и доставкой",
      icon: "shop",
      link: "/flower-shop",
      isInternal: true
    },
    /*{
      id: 2,
      title: "Информационная система отчётов",
      description: "Платформа для онлайн бронирования услуг",
      icon: "booking",
      link: "/toy-story-business-card",
      isInternal: true
    },*/
    {
      id: 3,
      title: "Туристическое агентство",
      description: "Премиум сайт туристического агентства с бронированием номеров",
      icon: "booking",
      link: "/tourism-agency",
      isInternal: true
    },
    {
      id: 4,
      title: "Sweet & Gifts - премиум подарки",
      description: "Интернет-магазин премиальных сладостей и подарочных наборов с элегантным дизайном",
      icon: "shop",
      link: "/sweet-gifts",
      isInternal: true
    } /*,
    {
      id: 5,
      title: "Социальная сеть",
      description: "Приложение для общения и обмена фото",
      icon: "social",
      link: "#"
    } */
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
  };

  const handleProjectClick = (project) => {
    if (project.isInternal) {
      navigate(project.link);
    } else {
      window.location.href = project.link;
    }
  };

  return (
    <div className="portfolio">
      {/* Фон с анимированными частицами */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="header">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="logo"
        >
          &lt;Dev /&gt;
        </motion.div>
        <motion.nav
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="nav"
        >
          <a href="#about">Обо мне</a>
          <a href="#projects">Проекты</a>
          <a href="#contact">Контакты</a>
        </motion.nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero-content"
        >
          <motion.h1 variants={itemVariants} className="hero-title">
            Привет, я веб-разработчик
          </motion.h1>
          <motion.p variants={itemVariants} className="hero-subtitle">
            Создаю красивые и функциональные веб-приложения
          </motion.p>
          <motion.p variants={itemVariants} className="hero-skills">
            React • JavaScript • Web Design
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="cta-buttons"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            >
              Посмотреть работы
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Связаться
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Анимированный градиент */}
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="gradient-orb"
        />
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="about-content"
        >
          <h2>Обо мне</h2>
          <p>
            Я middle разработчик с опытом создания веб-приложений.
            Специализируюсь на React и современном JavaScript. Люблю создавать
            интуитивные интерфейсы и писать чистый код.
          </p>
          <motion.div
            className="skills"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            {['React', 'JavaScript', 'CSS', 'Node.js', 'MongoDB', 'Git', 'jQuery', 'PHP', 'PostgreSQL' /*, 'Microsoft SQL Server'*/].map((skill) => (
              <motion.div
                key={skill}
                variants={itemVariants}
                whileHover={{ scale: 1.1, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
                className="skill-badge"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
              whileHover={{ y: -10 }}
              className="project-card"
            >
              <div className="project-icon">
                <ProjectIcon type={project.icon} />
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              
              {/* Анимированные линии на карте */}
              <motion.div
                animate={{
                  width: hoveredProject === project.id ? '100%' : '0%',
                }}
                transition={{ duration: 0.3 }}
                className="project-line"
              />
              
              <motion.button
                onClick={() => handleProjectClick(project)}
                className="project-link"
                animate={{
                  x: hoveredProject === project.id ? 10 : 0,
                  opacity: hoveredProject === project.id ? 1 : 0.7,
                }}
                transition={{ duration: 0.3 }}
              >
                Перейти →
              </motion.button>
            </motion.div>
          ))}
        </motion.div>

        {/* Специальная карточка для цветочного магазина */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="featured-project"
        >
          <motion.div
            animate={{
              rotate: [0, -2, 2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="flower-icon"
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="4" fill="#ec4899"/>
              <circle cx="32" cy="12" r="6" fill="#ec4899"/>
              <circle cx="50" cy="22" r="6" fill="#ec4899"/>
              <circle cx="50" cy="42" r="6" fill="#ec4899"/>
              <circle cx="32" cy="52" r="6" fill="#ec4899"/>
              <circle cx="14" cy="42" r="6" fill="#ec4899"/>
              <circle cx="14" cy="22" r="6" fill="#ec4899"/>
              <path d="M32 32L32 18M32 32L44 38M32 32L44 26M32 32L32 46M32 32L20 38M32 32L20 26" 
                    stroke="#ec4899" strokeWidth="1" opacity="0.6"/>
            </svg>
          </motion.div>
          <h3>Посмотрите мой цветочный магазин</h3>
          <p>Живой проект с полным функционалом e-commerce</p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(236, 72, 153, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-flower"
            onClick={() => navigate('/flower-shop')}
          >
            Откройте магазин →
          </motion.button>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2>Давайте создадим что-то крутое</h2>
          <p>Свяжитесь со мной в соцсетях или напишите письмо</p>
          <motion.div
            className="contact-links"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            {['LinkedIn', 'GitHub', 'Email'].map((link) => (
              <motion.a
                key={link}
                href="#"
                variants={itemVariants}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="contact-link"
              >
                {link}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Emily Unil. Все права защищены.</p>
      </footer>
    </div>
  );
}
