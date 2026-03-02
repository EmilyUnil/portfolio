// ========================================
// API SERVICES & INTEGRATIONS
// Premium Extensions for Applications
// ========================================

/**
 * ============================================
 * 1. PAYMENT PROCESSING (Stripe/Yandex.Kassa)
 * ============================================
 */

// Интеграция со Stripe
export const stripePayment = {
  init: (publishableKey) => {
    if (!window.Stripe) {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      document.head.appendChild(script);
    }
  },

  processPayment: async (token, amount, description) => {
    const response = await fetch('https://api.stripe.com/v1/charges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${process.env.REACT_APP_STRIPE_SECRET_KEY}`
      },
      body: `amount=${amount * 100}&currency=rub&source=${token}&description=${description}`
    });
    return response.json();
  }
};

// Интеграция с Яндекс.Касса
export const yandexKassaPayment = {
  init: (shopId) => {
    window.YaKassa = {
      shopId: shopId,
      scopes: ['payment.create']
    };
  },

  createPayment: async (orderData) => {
    const response = await fetch('https://api.yookassa.ru/v3/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(process.env.REACT_APP_YANDEX_SHOP_ID + ':' + process.env.REACT_APP_YANDEX_API_KEY)}`
      },
      body: JSON.stringify({
        amount: {
          value: orderData.total.toFixed(2),
          currency: 'RUB'
        },
        confirmation: {
          type: 'redirect',
          return_url: 'https://floralhaven.ru/success'
        },
        description: `Order #${orderData.id}`
      })
    });
    return response.json();
  }
};

/**
 * ============================================
 * 2. EMAIL NOTIFICATIONS
 * ============================================
 */

export const emailService = {
  sendOrderConfirmation: async (email, orderData) => {
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        template: 'order-confirmation',
        data: {
          orderId: orderData.id,
          items: orderData.items,
          total: orderData.total,
          deliveryDate: orderData.deliveryDate
        }
      })
    });
    return response.json();
  },

  sendDeliveryNotification: async (email, trackingNumber) => {
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        template: 'delivery-notification',
        data: { trackingNumber }
      })
    });
    return response.json();
  },

  sendReviewReminder: async (email, orderData) => {
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        template: 'review-reminder',
        data: { orderId: orderData.id, productName: orderData.productName }
      })
    });
    return response.json();
  }
};

/**
 * ============================================
 * 3. SMS NOTIFICATIONS (Twilio)
 * ============================================
 */

export const smsService = {
  sendOrderConfirmationSMS: async (phoneNumber, orderId) => {
    const response = await fetch('/api/sms/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: phoneNumber,
        body: `Ваш заказ #${orderId} принят! Статус доставки: https://track.floralhaven.ru/${orderId}`
      })
    });
    return response.json();
  },

  sendDeliverySMS: async (phoneNumber, trackingNumber) => {
    const response = await fetch('/api/sms/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: phoneNumber,
        body: `Ваш букет в пути! Трек: ${trackingNumber}`
      })
    });
    return response.json();
  }
};

/**
 * ============================================
 * 4. ANALYTICS & TRACKING
 * ============================================
 */

export const analyticsService = {
  // Google Analytics
  trackEvent: (category, action, label) => {
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label
      });
    }
  },

  trackPurchase: (orderData) => {
    if (window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: orderData.id,
        value: orderData.total,
        currency: 'RUB',
        items: orderData.items.map(item => ({
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          quantity: 1
        }))
      });
    }
  },

  trackAddToCart: (product) => {
    if (window.gtag) {
      window.gtag('event', 'add_to_cart', {
        items: [{
          item_id: product.id,
          item_name: product.name,
          price: product.price
        }]
      });
    }
  },

  // Яндекс.Метрика
  trackYandexEvent: (eventName, eventParams) => {
    if (window.ym) {
      window.ym(process.env.REACT_APP_YANDEX_METRICA_ID, 'reachGoal', eventName, eventParams);
    }
  }
};

/**
 * ============================================
 * 5. CRM INTEGRATION (HubSpot)
 * ============================================
 */

export const crmService = {
  createContact: async (contactData) => {
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_HUBSPOT_API_KEY}`
      },
      body: JSON.stringify({
        properties: {
          firstname: contactData.name.split(' ')[0],
          lastname: contactData.name.split(' ')[1] || '',
          phone: contactData.phone,
          email: contactData.email,
          address: contactData.address
        }
      })
    });
    return response.json();
  },

  createDeal: async (contactId, dealData) => {
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_HUBSPOT_API_KEY}`
      },
      body: JSON.stringify({
        properties: {
          dealname: dealData.name,
          dealstage: 'negotiation',
          amount: dealData.amount,
          closedate: new Date().toISOString()
        },
        associations: [{
          types: [{ associationType: 'contact_to_deal' }],
          id: contactId
        }]
      })
    });
    return response.json();
  }
};

/**
 * ============================================
 * 6. SOCIAL MEDIA INTEGRATION
 * ============================================
 */

export const socialService = {
  // WhatsApp
  shareOnWhatsApp: (productName, url) => {
    const text = encodeURIComponent(`Посмотри какой прекрасный букет "${productName}"! ${url}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  },

  // Telegram
  shareOnTelegram: (productName, url) => {
    const text = encodeURIComponent(`Посмотри какой прекрасный букет "${productName}"\n${url}`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${text}`, '_blank');
  },

  // VK
  shareOnVK: (productName, url) => {
    window.open(`https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(productName)}`, '_blank');
  },

  // Яндекс.Q
  shareOnYandexQ: (productName, url) => {
    window.open(`https://connect.yandex.ru/share?url=${encodeURIComponent(url)}&title=${encodeURIComponent(productName)}`, '_blank');
  }
};

/**
 * ============================================
 * 7. INVENTORY MANAGEMENT
 * ============================================
 */

export const inventoryService = {
  checkStock: async (productId) => {
    const response = await fetch(`/api/inventory/check/${productId}`);
    return response.json();
  },

  updateStock: async (productId, quantity) => {
    const response = await fetch(`/api/inventory/update/${productId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    });
    return response.json();
  },

  reserveItems: async (orderId, items) => {
    const response = await fetch('/api/inventory/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, items })
    });
    return response.json();
  }
};

/**
 * ============================================
 * 8. DELIVERY TRACKING
 * ============================================
 */

export const deliveryService = {
  // CDEK
  createCDEKOrder: async (orderData) => {
    const response = await fetch('https://api.cdek.ru/v2/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_CDEK_TOKEN}`
      },
      body: JSON.stringify({
        from_location: {
          postal_code: '119991',
          city: 'Москва'
        },
        to_location: {
          postal_code: orderData.postalCode,
          city: orderData.city
        },
        packages: [{
          number: orderData.id,
          weight: 500,
          items: [{
            ware_key: 'bouquet',
            payment: {
              value: orderData.total
            }
          }]
        }]
      })
    });
    return response.json();
  },

  // DPD
  createDPDOrder: async (orderData) => {
    const response = await fetch('https://api.dpd.ru/orders/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': process.env.REACT_APP_DPD_TOKEN
      },
      body: JSON.stringify({
        order: {
          orderNumber: orderData.id,
          shipmentType: 'CARD',
          recipient: {
            contactPerson: orderData.name,
            phones: [{ number: orderData.phone }],
            address: {
              city: orderData.city,
              street: orderData.street,
              building: orderData.building
            }
          },
          cargo: {
            totalWeight: 500,
            description: 'Букет цветов'
          }
        }
      })
    });
    return response.json();
  },

  trackOrder: async (trackingNumber) => {
    const response = await fetch(`/api/delivery/track/${trackingNumber}`);
    return response.json();
  }
};

/**
 * ============================================
 * 9. REVIEW MANAGEMENT
 * ============================================
 */

export const reviewService = {
  submitReview: async (productId, reviewData) => {
    const response = await fetch(`/api/reviews/${productId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rating: reviewData.rating,
        text: reviewData.text,
        author: reviewData.author,
        email: reviewData.email
      })
    });
    return response.json();
  },

  getReviews: async (productId) => {
    const response = await fetch(`/api/reviews/${productId}`);
    return response.json();
  }
};

/**
 * ============================================
 * 10. LOYALTY PROGRAM
 * ============================================
 */

export const loyaltyService = {
  getUserLoyaltyStatus: async (userId) => {
    const response = await fetch(`/api/loyalty/user/${userId}`);
    return response.json();
  },

  addLoyaltyPoints: async (userId, points, reason) => {
    const response = await fetch(`/api/loyalty/points/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, points, reason })
    });
    return response.json();
  },

  redeemLoyaltyPoints: async (userId, points) => {
    const response = await fetch(`/api/loyalty/points/redeem`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, points })
    });
    return response.json();
  }
};

export default {
  stripePayment,
  yandexKassaPayment,
  emailService,
  smsService,
  analyticsService,
  crmService,
  socialService,
  inventoryService,
  deliveryService,
  reviewService,
  loyaltyService
};
