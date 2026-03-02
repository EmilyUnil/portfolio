import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Heart, Star, Search, Menu, X, ChevronRight, ArrowRight } from 'lucide-react';
import './flower-shop.css';
import './advanced-animation-flowershop.css';

export default function FlowerShop() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [likedItems, setLikedItems] = useState(new Set());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFlowers, setFilteredFlowers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderForm, setOrderForm] = useState({ name: '', phone: '', address: '', delivery: 'courier' });
  const [scrollY, setScrollY] = useState(0);

  const colors = {
    darkPurple: '#1a0f2e',
    purple: '#3d2660',
    lightPurple: '#6b4fa8',
    accent: '#9d6bb8',
    darkBg: '#0a0510',
    lightBg: '#f3eff8',
    text: '#0f0f0f',
    textLight: '#555',
    white: '#ffffff',
    border: '#e0d8f0'
  };

  const flowers = [
    {
      id: 1,
      name: 'Midnight Rose',
      category: 'premium',
      description: 'Премиальные темные розы с эвкалиптом',
      price: 4500,
      image: 'https://i.pinimg.com/736x/9f/c5/79/9fc5796bfbedccff0cce4de5661e6fe4.jpg',
      rating: 5,
      composition: ['Роза', 'Эвкалипт']
    },
    {
      id: 2,
      name: 'Lavender Dream',
      category: 'premium',
      description: 'Нежная композиция в лавандовых тонах',
      price: 3800,
      image: 'https://kvetku.by/image/cache/catalog/Flowers/monobyket/Rose%20Classic/buket-cvetov-159--652x652.jpg',
      rating: 5,
      composition: ['Лаванда', 'Роза']
    },
    {
      id: 3,
      name: 'Minimalist Pearl',
      category: 'minimal',
      description: 'Лаконичная белая композиция',
      price: 2200,
      image: 'https://kvetku.by/image/cache/catalog/Flowers/bouquets/buket-cvetov-3-:.JPG-652x652.JPG',
      rating: 5,
      composition: ['Белая роза', 'Зелень']
    },
    {
      id: 4,
      name: 'Cherry Blossom',
      category: 'seasonal',
      description: 'Весенняя свежесть с вишневыми оттенками',
      price: 3200,
      image: 'https://content2.flowwow-images.com/data/flowers/524x524/31/1739878087_11110731.jpg',
      rating: 5,
      composition: ['Тюльпаны', 'Гиацинты']
    },
    {
      id: 5,
      name: 'Velvet Luxury',
      category: 'premium',
      description: 'Экстравагантная композиция премиум класса',
      price: 5800,
      image: 'https://kvetku.by/image/cache/catalog/Flowers/bouquets/DM-14-10/buket-cvetov-120-652x652.jpg',
      rating: 5,
      composition: ['Премиум розы', 'Орхидеи']
    },
    {
      id: 6,
      name: 'Pure White',
      category: 'minimal',
      description: 'Идеальная простота и элегантность',
      price: 1800,
      image: 'https://kvetku.by/image/cache/catalog/Flowers/buket-cvetov-45--652x652.jpg',
      rating: 4,
      composition: ['Белые розы']
    },
    {
      id: 7,
      name: 'Garden Romance',
      category: 'seasonal',
      description: 'Пышная композиция с пионами',
      price: 4200,
      image: 'https://buketinmoscow.ru/wp-content/uploads/2025/02/1102252632.jpeg',
      rating: 5,
      composition: ['Пионы', 'Розы']
    },
    {
      id: 8,
      name: 'Moody Bouquet',
      category: 'premium',
      description: 'Драматичная композиция с черными элементами',
      price: 5500,
      image: 'https://content2.flowwow-images.com/data/flowers/524x524/10/1755264465_11121610.jpg',
      rating: 5,
      composition: ['Черные розы', 'Лаванда']
    }
  ];

  const categories = [
    { id: 'all', name: 'Все' },
    { id: 'premium', name: 'Premium' },
    { id: 'minimal', name: 'Minimal' },
    { id: 'seasonal', name: 'Seasonal' }
  ];

  useEffect(() => {
    let filtered = flowers;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(f => f.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(f => 
        f.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredFlowers(filtered);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLike = (id) => {
    const newLiked = new Set(likedItems);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedItems(newLiked);
  };

  const addToCart = (flower) => {
    setCart([...cart, { ...flower, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleOrderSubmit = () => {
    if (orderForm.name && orderForm.phone && orderForm.address && cart.length > 0) {
      alert(`Заказ оформлен!\n\nСумма: ${totalPrice}₽`);
      setCart([]);
      setShowCheckout(false);
      setOrderForm({ name: '', phone: '', address: '', delivery: 'courier' });
    }
  };

  return (
    <div style={{ backgroundColor: colors.lightBg, minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        background: colors.white,
        borderBottom: `1px solid ${colors.border}`,
        zIndex: 1000,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        display: 'flex',
        alignItems: 'center',
        paddingRight: 'clamp(20px, 5vw, 40px)',
        paddingLeft: 'clamp(20px, 5vw, 40px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(30px, 10vw, 60px)', flex: 1 }}>
          <h1 style={{
            margin: 0,
            fontSize: 'clamp(20px, 5vw, 24px)',
            fontWeight: '700',
            letterSpacing: '-1px',
            color: colors.darkPurple
          }}>
            FLORAL
          </h1>
          
          <div style={{
            display: 'flex',
            gap: 'clamp(20px, 5vw, 40px)',
            '@media (max-width: 768px)': {
              display: 'none'
            }
          }}>
            {['About', 'Collection', 'Contact'].map((item) => (
              <button key={item} style={{
                background: 'none',
                border: 'none',
                color: colors.text,
                fontSize: '14px',
                fontWeight: '500',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.color = colors.purple}
              onMouseLeave={(e) => e.target.style.color = colors.text}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'clamp(12px, 4vw, 20px)', alignItems: 'center' }}>
          <button
            onClick={() => setCartOpen(!cartOpen)}
            style={{
              background: colors.darkPurple,
              border: 'none',
              color: colors.white,
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              transition: 'all 0.3s',
              minWidth: '40px',
              minHeight: '40px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = colors.purple;
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = colors.darkPurple;
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: colors.accent,
                color: colors.white,
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                fontSize: '12px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Cart Sidebar */}
      {cartOpen && (
        <>
          <div 
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
              backdropFilter: 'blur(4px)'
            }}
            onClick={() => setCartOpen(false)}
          />
          <div style={{
            position: 'fixed',
            right: 0,
            top: 0,
            width: 'clamp(300px, 90vw, 400px)',
            height: '100vh',
            background: colors.white,
            zIndex: 1001,
            overflowY: 'auto',
            padding: 'clamp(20px, 5vw, 30px)',
            boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: colors.darkPurple }}>
                Cart
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: colors.textLight
                }}
              >
                <X size={24} />
              </button>
            </div>

            {cart.length === 0 ? (
              <p style={{ color: colors.textLight, textAlign: 'center', marginTop: '60px' }}>
                Your cart is empty
              </p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.cartId} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '20px',
                    marginBottom: '20px',
                    borderBottom: `1px solid ${colors.border}`
                  }}>
                    <div>
                      <p style={{ margin: '0 0 8px 0', fontWeight: '600', fontSize: '14px', color: colors.text }}>
                        {item.name}
                      </p>
                      <p style={{ margin: 0, fontSize: '13px', color: colors.textLight }}>
                        ₽{item.price.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      style={{
                        background: colors.lightBg,
                        border: 'none',
                        color: colors.text,
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                
                <div style={{
                  paddingTop: '20px',
                  marginTop: '20px',
                  borderTop: `2px solid ${colors.border}`
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '25px',
                    fontSize: '16px',
                    fontWeight: '700'
                  }}>
                    <span>Total:</span>
                    <span style={{ color: colors.purple }}>₽{totalPrice.toLocaleString()}</span>
                  </div>
                  
                  <button
                    onClick={() => {
                      setShowCheckout(true);
                      setCartOpen(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: colors.darkPurple,
                      color: colors.white,
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '700',
                      letterSpacing: '1px',
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = colors.purple}
                    onMouseLeave={(e) => e.target.style.background = colors.darkPurple}
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* Hero */}
      <section style={{
        marginTop: '70px',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${colors.darkPurple} 0%, ${colors.darkBg} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(20px, 5vw, 40px)'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 'clamp(400px, 80vw, 600px)',
          height: 'clamp(400px, 80vw, 600px)',
          background: `radial-gradient(circle, ${colors.purple}33 0%, transparent 70%)`,
          borderRadius: '50%',
          filter: 'blur(40px)',
          transform: `translateY(${scrollY * 0.5}px)`,
          pointerEvents: 'none'
        }} />

        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '700px',
          color: colors.white,
          padding: 'clamp(0, 5vw, 20px)'
        }}>
          <h2 style={{
            fontSize: 'clamp(12px, 3vw, 14px)',
            fontWeight: '600',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: colors.accent,
            marginBottom: 'clamp(15px, 4vw, 20px)'
          }}>
            Curated Bouquets
          </h2>
          <h1 style={{
            fontSize: 'clamp(36px, 10vw, 72px)',
            fontWeight: '800',
            margin: '0 0 clamp(15px, 4vw, 20px) 0',
            lineHeight: '1.1',
            letterSpacing: '-2px'
          }}>
            Elegance in Every Bloom
          </h1>
          <p style={{
            fontSize: 'clamp(14px, 4vw, 18px)',
            fontWeight: '300',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: 'clamp(20px, 5vw, 40px)',
            lineHeight: '1.6'
          }}>
            Hand-selected flowers arranged with precision and passion
          </p>
          
          <button style={{
            padding: 'clamp(12px, 3vw, 14px) clamp(25px, 8vw, 40px)',
            background: colors.accent,
            color: colors.text,
            border: 'none',
            borderRadius: '6px',
            fontSize: 'clamp(12px, 3vw, 14px)',
            fontWeight: '700',
            letterSpacing: '1px',
            cursor: 'pointer',
            textTransform: 'uppercase',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = colors.white;
            e.target.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = colors.accent;
            e.target.style.transform = 'translateY(0)';
          }}
          >
            Explore Collection
          </button>
        </div>
      </section>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: 'clamp(20px, 5vw, 40px)' }}>
        {/* Collection */}
        <section style={{ padding: 'clamp(60px, 15vw, 80px) 0' }}>
          <div style={{ marginBottom: 'clamp(40px, 10vw, 60px)' }}>
            <h2 style={{
              fontSize: 'clamp(28px, 8vw, 42px)',
              fontWeight: '800',
              marginBottom: 'clamp(10px, 3vw, 15px)',
              color: colors.darkPurple
            }}>
              Collection
            </h2>
            <p style={{
              fontSize: 'clamp(14px, 3vw, 16px)',
              color: colors.textLight,
              margin: 0
            }}>
              Discover our carefully curated selection
            </p>
          </div>

          {/* Filter */}
          <div style={{
            display: 'flex',
            gap: 'clamp(10px, 3vw, 15px)',
            marginBottom: 'clamp(30px, 8vw, 50px)',
            flexWrap: 'wrap'
          }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '10px 24px',
                  border: selectedCategory === cat.id ? 'none' : `1px solid ${colors.border}`,
                  background: selectedCategory === cat.id ? colors.darkPurple : 'transparent',
                  color: selectedCategory === cat.id ? colors.white : colors.text,
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== cat.id) {
                    e.target.style.borderColor = colors.purple;
                    e.target.style.color = colors.purple;
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== cat.id) {
                    e.target.style.borderColor = colors.border;
                    e.target.style.color = colors.text;
                  }
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(250px, 45vw, 280px), 1fr))',
            gap: 'clamp(20px, 5vw, 30px)'
          }}>
            {filteredFlowers.map((flower) => (
              <div key={flower.id} style={{
                group: 'card',
                background: colors.white,
                borderRadius: '12px',
                overflow: 'hidden',
                border: `1px solid ${colors.border}`,
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.accent;
                e.currentTarget.style.boxShadow = `0 20px 40px rgba(199, 157, 219, 0.15)`;
                e.currentTarget.style.transform = 'translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.border;
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <div style={{
                  position: 'relative',
                  height: 'clamp(250px, 60vw, 360px)',
                  overflow: 'hidden',
                  background: colors.lightBg
                }}>
                  <img
                    src={flower.image}
                    alt={flower.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  <button
                    onClick={() => toggleLike(flower.id)}
                    style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      background: colors.white,
                      border: 'none',
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <Heart
                      size={20}
                      color={likedItems.has(flower.id) ? '#c79ddb' : colors.textLight}
                      fill={likedItems.has(flower.id) ? '#c79ddb' : 'none'}
                    />
                  </button>
                </div>

                <div style={{ padding: 'clamp(16px, 4vw, 24px)' }}>
                  <div style={{
                    display: 'flex',
                    gap: '4px',
                    marginBottom: 'clamp(8px, 2vw, 12px)'
                  }}>
                    {[...Array(flower.rating)].map((_, i) => (
                      <Star key={i} size={14} color={colors.accent} fill={colors.accent} />
                    ))}
                  </div>

                  <h3 style={{
                    margin: '0 0 clamp(6px, 2vw, 8px) 0',
                    fontSize: 'clamp(14px, 4vw, 16px)',
                    fontWeight: '700',
                    color: colors.darkPurple
                  }}>
                    {flower.name}
                  </h3>

                  <p style={{
                    margin: '0 0 clamp(12px, 3vw, 16px) 0',
                    fontSize: 'clamp(12px, 3vw, 13px)',
                    color: colors.textLight,
                    lineHeight: '1.5'
                  }}>
                    {flower.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 'clamp(10px, 3vw, 15px)',
                    flexWrap: 'wrap'
                  }}>
                    <p style={{
                      margin: 0,
                      fontSize: 'clamp(16px, 4vw, 18px)',
                      fontWeight: '800',
                      color: colors.purple
                    }}>
                      ₽{flower.price.toLocaleString()}
                    </p>
                    <button
                      onClick={() => addToCart(flower)}
                      style={{
                        background: colors.accent,
                        color: colors.text,
                        border: 'none',
                        padding: 'clamp(8px, 2vw, 10px) clamp(12px, 3vw, 16px)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: 'clamp(11px, 2.5vw, 12px)',
                        fontWeight: '700',
                        letterSpacing: '0.5px',
                        transition: 'all 0.3s',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = colors.darkPurple;
                        e.target.style.color = colors.white;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = colors.accent;
                        e.target.style.color = colors.text;
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          padding: 'clamp(40px, 10vw, 80px) 0 clamp(20px, 5vw, 40px)',
          borderTop: `1px solid ${colors.border}`,
          marginTop: 'clamp(60px, 15vw, 100px)'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(30px, 8vw, 60px)',
            marginBottom: 'clamp(30px, 8vw, 60px)'
          }}>
            <div>
              <h4 style={{
                fontSize: 'clamp(11px, 2.5vw, 12px)',
                fontWeight: '700',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: colors.darkPurple,
                marginBottom: 'clamp(12px, 3vw, 20px)'
              }}>
                About
              </h4>
              <p style={{
                fontSize: 'clamp(12px, 2.5vw, 13px)',
                color: colors.textLight,
                lineHeight: '1.8',
                margin: 0
              }}>
                Curated floral arrangements that celebrate life's most beautiful moments
              </p>
            </div>
            <div>
              <h4 style={{
                fontSize: 'clamp(11px, 2.5vw, 12px)',
                fontWeight: '700',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: colors.darkPurple,
                marginBottom: 'clamp(12px, 3vw, 20px)'
              }}>
                Collections
              </h4>
              {['Premium', 'Minimal', 'Seasonal'].map((item) => (
                <p key={item} style={{
                  fontSize: 'clamp(12px, 2.5vw, 13px)',
                  color: colors.textLight,
                  margin: 'clamp(6px, 2vw, 10px) 0',
                  cursor: 'pointer',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = colors.purple}
                onMouseLeave={(e) => e.target.style.color = colors.textLight}
                >
                  {item}
                </p>
              ))}
            </div>
            <div>
              <h4 style={{
                fontSize: 'clamp(11px, 2.5vw, 12px)',
                fontWeight: '700',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: colors.darkPurple,
                marginBottom: 'clamp(12px, 3vw, 20px)'
              }}>
                Support
              </h4>
              <p style={{
                fontSize: 'clamp(12px, 2.5vw, 13px)',
                color: colors.textLight,
                margin: 'clamp(6px, 2vw, 10px) 0',
                cursor: 'pointer'
              }}>
                +7 (999) 123-45-67
              </p>
              <p style={{
                fontSize: 'clamp(12px, 2.5vw, 13px)',
                color: colors.textLight,
                margin: 'clamp(6px, 2vw, 10px) 0',
                cursor: 'pointer'
              }}>
                hello@floral.ru
              </p>
            </div>
            <div>
              <h4 style={{
                fontSize: 'clamp(11px, 2.5vw, 12px)',
                fontWeight: '700',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: colors.darkPurple,
                marginBottom: 'clamp(12px, 3vw, 20px)'
              }}>
                Follow
              </h4>
              {['Instagram', 'Pinterest', 'Facebook'].map((item) => (
                <p key={item} style={{
                  fontSize: 'clamp(12px, 2.5vw, 13px)',
                  color: colors.textLight,
                  margin: 'clamp(6px, 2vw, 10px) 0',
                  cursor: 'pointer',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = colors.purple}
                onMouseLeave={(e) => e.target.style.color = colors.textLight}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div style={{
            paddingTop: 'clamp(20px, 5vw, 40px)',
            borderTop: `1px solid ${colors.border}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'clamp(15px, 4vw, 20px)'
          }}>
            <p style={{
              fontSize: 'clamp(11px, 2.5vw, 12px)',
              color: colors.textLight,
              margin: 0,
              letterSpacing: '0.5px'
            }}>
              © 2024 FLORAL. All rights reserved
            </p>
            <div style={{ display: 'flex', gap: 'clamp(12px, 4vw, 20px)', flexWrap: 'wrap' }}>
              {['Privacy', 'Terms', 'Cookies'].map((item) => (
                <p key={item} style={{
                  fontSize: 'clamp(11px, 2.5vw, 12px)',
                  color: colors.textLight,
                  margin: 0,
                  cursor: 'pointer',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = colors.purple}
                onMouseLeave={(e) => e.target.style.color = colors.textLight}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </footer>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(4px)',
          padding: '20px'
        }}>
          <div style={{
            background: colors.white,
            borderRadius: '12px',
            padding: 'clamp(30px, 8vw, 50px)',
            maxWidth: '500px',
            width: 'calc(100% - clamp(20px, 4vw, 40px))',
            maxHeight: '90vh',
            overflowY: 'auto',
            margin: 'clamp(20px, 5vw, 40px)'
          }}>
            <h2 style={{
              margin: '0 0 clamp(20px, 5vw, 30px) 0',
              fontSize: 'clamp(22px, 6vw, 28px)',
              fontWeight: '800',
              color: colors.darkPurple
            }}>
              Complete Your Order
            </h2>

            <form style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(15px, 4vw, 20px)' }}>
              {[
                { label: 'Full Name', field: 'name', placeholder: 'Your name' },
                { label: 'Phone', field: 'phone', placeholder: '+7 (999) 123-45-67' },
                { label: 'Address', field: 'address', placeholder: 'Delivery address', isTextarea: true }
              ].map((input) => (
                <div key={input.field}>
                  <label style={{
                    display: 'block',
                    marginBottom: 'clamp(6px, 2vw, 8px)',
                    fontSize: 'clamp(11px, 2.5vw, 13px)',
                    fontWeight: '700',
                    color: colors.darkPurple,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase'
                  }}>
                    {input.label}
                  </label>
                  {input.isTextarea ? (
                    <textarea
                      placeholder={input.placeholder}
                      value={orderForm[input.field]}
                      onChange={(e) => setOrderForm({ ...orderForm, [input.field]: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: `1px solid ${colors.border}`,
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box',
                        minHeight: '100px',
                        transition: 'border-color 0.3s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = colors.purple}
                      onBlur={(e) => e.target.style.borderColor = colors.border}
                    />
                  ) : (
                    <input
                      type={input.field === 'phone' ? 'tel' : 'text'}
                      placeholder={input.placeholder}
                      value={orderForm[input.field]}
                      onChange={(e) => setOrderForm({ ...orderForm, [input.field]: e.target.value })}
                      style={{
                        width: '100%',
                        padding: 'clamp(10px, 2.5vw, 12px) clamp(12px, 3vw, 16px)',
                        border: `1px solid ${colors.border}`,
                        borderRadius: '6px',
                        fontSize: 'clamp(13px, 3vw, 14px)',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.3s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = colors.purple}
                      onBlur={(e) => e.target.style.borderColor = colors.border}
                    />
                  )}
                </div>
              ))}

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: colors.darkPurple,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}>
                  Delivery
                </label>
                <select
                  value={orderForm.delivery}
                  onChange={(e) => setOrderForm({ ...orderForm, delivery: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: `1px solid ${colors.border}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    background: colors.white
                  }}
                >
                  <option value="courier">Courier (200₽)</option>
                  <option value="pickup">Pickup (Free)</option>
                </select>
              </div>

              <div style={{
                background: colors.lightBg,
                padding: '20px',
                borderRadius: '8px',
                marginTop: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                  fontSize: '14px'
                }}>
                  <span>Subtotal:</span>
                  <span>₽{totalPrice.toLocaleString()}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '18px',
                  fontWeight: '800',
                  paddingTop: '10px',
                  borderTop: `1px solid ${colors.border}`
                }}>
                  <span>Total:</span>
                  <span style={{ color: colors.purple }}>₽{(totalPrice + (orderForm.delivery === 'courier' ? 200 : 0)).toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleOrderSubmit}
                style={{
                  padding: '14px',
                  background: colors.darkPurple,
                  color: colors.white,
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  marginTop: '20px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.background = colors.purple}
                onMouseLeave={(e) => e.target.style.background = colors.darkPurple}
              >
                Confirm Order
              </button>

              <button
                onClick={() => setShowCheckout(false)}
                style={{
                  padding: '12px',
                  background: 'transparent',
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = colors.purple;
                  e.target.style.color = colors.purple;
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.color = colors.text;
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
