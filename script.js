// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化各种功能
    // 仅在首页初始化粒子背景
    if (window.location.pathname === '/' || window.location.pathname.includes('index.html') || window.location.pathname === '/index.html') {
        initParticles();
        initParticleInteraction();
    }
    initMobileNav();
    initScrollAnimations();
    initCounters();
    initScrollEffects();
    initButtonAnimations();
    initPageTransition(); // 启用页面切换功能
    initExploreButton(); // 添加"开始探索"按钮功能
});

// 粒子背景初始化
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 60,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#8B5CF6', '#06B6D4']
                },
                shape: {
                    type: ['circle', 'triangle', 'edge'],
                    stroke: {
                        width: 1,
                        color: '#8B5CF6'
                    }
                },
                opacity: {
                    value: 0.4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 3,
                        size_min: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 180,
                    color: '#8B5CF6',
                    opacity: 0.3,
                    width: 1.5,
                    shadow: {
                        enable: true,
                        color: '#8B5CF6',
                        blur: 5
                    }
                },
                move: {
                    enable: true,
                    speed: 0.8,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'bounce',
                    bounce: true,
                    attract: {
                        enable: false
                    }
                }
            },
                            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: ['grab', 'bubble']
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 300,
                        line_linked: {
                            opacity: 0.8
                        }
                    },
                    bubble: {
                        distance: 250,
                        size: 15,
                        duration: 2,
                        opacity: 0.8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.6
                    },
                    push: {
                        particles_nb: 6
                    },
                    remove: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }
}

// 移动端导航菜单
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // 点击导航链接时关闭菜单
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// 滚动动画初始化
function initScrollAnimations() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100
        });
    }
}

// 数字计数器动画
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// 数字动画函数
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 20);
}

// 滚动效果
function initScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // 导航栏背景透明度
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const opacity = Math.min(scrollTop / 100, 0.95);
            navbar.style.background = `rgba(15, 15, 35, ${opacity})`;
        }
        
        // 视差效果
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroRect = hero.getBoundingClientRect();
            if (heroRect.bottom >= 0) {
                const translateY = scrollTop * 0.5;
                hero.style.transform = `translateY(${translateY}px)`;
            }
        }
        
        // 浮动卡片动画
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach((card, index) => {
            const speed = 0.3 + (index * 0.1);
            const translateY = scrollTop * speed;
            card.style.transform = `translateY(${translateY}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// 按钮动画效果
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
    });
}

// 平滑滚动到指定元素
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// 添加页面切换动画
function initPageTransitions() {
    // 页面加载动画
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // 链接点击动画
    const links = document.querySelectorAll('a[href^="./"], a[href$=".html"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                // 直接跳转，不使用转场效果
                window.location.href = href;
            }
        });
    });
}

// 鼠标跟随效果
function initMouseFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    cursor.innerHTML = '<div class="cursor-inner"></div>';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // 鼠标悬停效果
    const hoverElements = document.querySelectorAll('a, button, .service-card, .floating-card');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
        });
    });
}

// 添加鼠标跟随器样式
const cursorStyles = `
.cursor-follower {
    position: fixed;
    width: 20px;
    height: 20px;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease;
}

.cursor-inner {
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.8), rgba(139, 92, 246, 0.2));
    border-radius: 50%;
    transform: scale(0.5);
    transition: transform 0.2s ease;
}

.cursor-follower.hover .cursor-inner {
    transform: scale(2);
    background: radial-gradient(circle, rgba(139, 92, 246, 0.6), rgba(139, 92, 246, 0.1));
}

@media (max-width: 768px) {
    .cursor-follower {
        display: none;
    }
}
`;

// 动态添加样式
const styleSheet = document.createElement('style');
styleSheet.textContent = cursorStyles;
document.head.appendChild(styleSheet);

// 初始化额外功能
document.addEventListener('DOMContentLoaded', function() {
    // initPageTransitions(); // 注释掉转场功能
    initExploreButton(); // 初始化"开始探索"按钮
    
    // 仅在桌面设备上启用鼠标跟随效果
    if (window.innerWidth > 768) {
        initMouseFollower();
    }
});

// 页面转场功能
function initPageTransition() {
    const transition = document.getElementById('pageTransition');
    const navLinks = document.querySelectorAll('.nav-link');
    const allLinks = document.querySelectorAll('a[href$=".html"], a[href="/"], a[href="index.html"]');
    
    // 页面加载时隐藏转场动画
    if (transition) {
        setTimeout(() => {
            transition.classList.remove('active');
        }, 100);
    }
    
    // 为所有页面链接添加转场效果
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 检查是否是外部链接或当前页面
            if (href && href !== '#' && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                const targetPage = href.split('/').pop();
                
                // 如果不是当前页面，则显示转场动画
                if (currentPage !== targetPage) {
                    e.preventDefault();
                    
                    // 显示转场动画
                    if (transition) {
                        transition.classList.add('active');
                        
                        // 重新触发动画
                        const logo = transition.querySelector('.transition-logo');
                        if (logo) {
                            logo.style.animation = 'none';
                            logo.offsetHeight; // 强制重排
                            logo.style.animation = 'logoJump 0.8s ease-in-out';
                        }
                    }
                    
                    // 延迟跳转
                    setTimeout(() => {
                        window.location.href = href;
                    }, 800);
                }
            }
        });
    });
}

// 添加"开始探索"按钮功能
function initExploreButton() {
    const exploreBtn = document.querySelector('.btn.btn-primary');
    if (exploreBtn && exploreBtn.textContent.includes('开始探索')) {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const servicesSection = document.querySelector('.services-overview');
            if (servicesSection) {
                servicesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// 在DOMContentLoaded中初始化功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化"开始探索"按钮
    initExploreButton();
});

// 窗口调整大小时的处理
window.addEventListener('resize', function() {
    // 重新初始化AOS
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
    
    // 重新计算粒子
    if (typeof pJSDom !== 'undefined' && pJSDom[0]) {
        pJSDom[0].pJS.fn.canvasSize();
        pJSDom[0].pJS.fn.canvasPaint();
    }
});

// 优化性能：节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 优化滚动性能
const optimizedScrollHandler = throttle(function() {
    // 这里可以添加需要在滚动时执行的优化代码
}, 16); // 60fps

window.addEventListener('scroll', optimizedScrollHandler);

// 粒子鼠标交互效果
function initParticleInteraction() {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) return;
    
    let mouseX = 0, mouseY = 0;
    let animationId;
    
    // 鼠标移动时的实时交互
    particlesContainer.addEventListener('mousemove', function(e) {
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            const rect = particlesContainer.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
            
            // 更新鼠标位置供粒子系统使用
            window.pJSDom[0].pJS.interactivity.mouse.pos_x = mouseX;
            window.pJSDom[0].pJS.interactivity.mouse.pos_y = mouseY;
            
            // 启动粒子交互动画
            if (!animationId) {
                animateParticles();
            }
        }
    });
    
    // 平滑的粒子交互动画
    function animateParticles() {
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            const particles = window.pJSDom[0].pJS.particles.array;
            
            particles.forEach(particle => {
                const dx = particle.x - mouseX;
                const dy = particle.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 250) {
                    // 计算吸引力，距离越近力越强
                    const force = Math.max(0, (250 - distance) / 250);
                    const attraction = force * 0.008; // 增强吸引力
                    
                    // 向鼠标方向的单位向量
                    const unitX = -dx / distance;
                    const unitY = -dy / distance;
                    
                    // 应用吸引力
                    particle.vx += unitX * attraction;
                    particle.vy += unitY * attraction;
                    
                    // 添加一些随机性让运动更自然
                    particle.vx += (Math.random() - 0.5) * 0.002;
                    particle.vy += (Math.random() - 0.5) * 0.002;
                    
                    // 距离很近时增加额外的加速度
                    if (distance < 100) {
                        const extraForce = (100 - distance) / 100;
                        particle.vx += unitX * extraForce * 0.01;
                        particle.vy += unitY * extraForce * 0.01;
                    }
                    
                    // 限制最大速度，让运动更平滑
                    const maxSpeed = 1.5 + force * 2; // 距离鼠标越近，最大速度越高
                    const currentSpeed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
                    if (currentSpeed > maxSpeed) {
                        particle.vx = (particle.vx / currentSpeed) * maxSpeed;
                        particle.vy = (particle.vy / currentSpeed) * maxSpeed;
                    }
                } else {
                    // 远离鼠标的粒子逐渐恢复原始速度
                    particle.vx *= 0.96;
                    particle.vy *= 0.96;
                }
            });
            
            animationId = requestAnimationFrame(animateParticles);
        }
    }
    
    particlesContainer.addEventListener('mouseleave', function() {
        // 停止动画循环
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
        
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            // 平滑恢复粒子原始状态
            const particles = window.pJSDom[0].pJS.particles.array;
            let recoveryFrames = 0;
            
            function recoverParticles() {
                particles.forEach(particle => {
                    // 逐渐减少速度
                    particle.vx *= 0.95;
                    particle.vy *= 0.95;
                });
                
                recoveryFrames++;
                if (recoveryFrames < 30) { // 约0.5秒的恢复时间
                    requestAnimationFrame(recoverParticles);
                }
            }
            
            recoverParticles();
        }
    });
}

// 更多成员按钮功能
function initMoreMembersToggle() {
    const moreMembersBtn = document.getElementById('moreMembersBtn');
    const extendedTeam = document.getElementById('extendedTeam');
    
    if (moreMembersBtn && extendedTeam) {
        moreMembersBtn.addEventListener('click', function() {
            const isExpanded = extendedTeam.style.display !== 'none';
            
            if (isExpanded) {
                // 收起
                extendedTeam.classList.remove('show');
                setTimeout(() => {
                    extendedTeam.style.display = 'none';
                }, 500);
                moreMembersBtn.classList.remove('expanded');
                moreMembersBtn.querySelector('.btn-text').textContent = '更多成员';
            } else {
                // 展开
                extendedTeam.style.display = 'grid';
                setTimeout(() => {
                    extendedTeam.classList.add('show');
                }, 10);
                moreMembersBtn.classList.add('expanded');
                moreMembersBtn.querySelector('.btn-text').textContent = '收起成员';
            }
        });
    }
}

// 确保"开始探索"按钮功能正常工作
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initExploreButton, 100); // 稍微延迟以确保DOM完全加载
    initMoreMembersToggle(); // 初始化更多成员功能
});



 