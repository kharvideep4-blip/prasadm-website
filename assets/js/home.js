/**
 * HOME PAGE JS – Features, Steps, Stats, etc.
 * Only used on the Home page
 */

(function() {
    'use strict';

    // ===== DATA =====

    const features = [
        { icon: '🛡️', bg: 'linear-gradient(135deg,#E85D26,#FF7A1A)', title: 'Governance & Administrative', desc: 'Trust/Board management, policies, SOPs, and administrative oversight' },
        { icon: '📖', bg: 'linear-gradient(135deg,#E85D26,#C44A1A)', title: 'Religious & Ritual Management', desc: 'Daily puja, rituals, festivals, and religious ceremonies' },
        { icon: '💳', bg: 'linear-gradient(135deg,#7C3AED,#9F67F0)', title: 'Financial Management', desc: 'Income sources, accounting, budgeting, and financial compliance' },
        { icon: '📄', bg: 'linear-gradient(135deg,#3B82F6,#2563EB)', title: 'Legal & Statutory Compliance', desc: 'Trust registration, tax exemptions, and regulatory compliance' },
        { icon: '🏛️', bg: 'linear-gradient(135deg,#10B981,#059669)', title: 'Infrastructure & Facility Management', desc: 'Maintenance, repairs, security systems, and facility upkeep' },
        { icon: '👤', bg: 'linear-gradient(135deg,#3B82F6,#2563EB)', title: 'Human Resource Management', desc: 'Staff management, payroll, training, and volunteer coordination' },
        { icon: '💻', bg: 'linear-gradient(135deg,#10B981,#059669)', title: 'IT & Digital Systems', desc: 'Temple management platform, online services, and digital infrastructure' },
        { icon: '🤝', bg: 'linear-gradient(135deg,#10B981,#059669)', title: 'Community & Devotee Engagement', desc: 'Community programs, education, welfare, and devotee services' },
        { icon: '🔗', bg: 'linear-gradient(135deg,#E85D26,#FF7A1A)', title: 'External Coordination', desc: 'Liaison with authorities, government departments, and external agencies' },
    ];

    const steps = [
        { icon: '✅', iconBg: 'linear-gradient(135deg,#7C3AED,#9F67F0)', title: '1. Devotee Login', desc: 'Secure registration and authentication for devotees and temple staff with role-based access' },
        { icon: '📅', iconBg: 'linear-gradient(135deg,#10B981,#059669)', title: '2. Service Booking', desc: 'Online puja scheduling, hall reservations, and special event bookings with calendar integration' },
        { icon: '💰', iconBg: 'linear-gradient(135deg,#E85D26,#FF7A1A)', title: '3. Secure Donations', desc: 'Multiple payment gateways, donation tracking, and automated receipt generation' },
        { icon: '📊', iconBg: 'linear-gradient(135deg,#7C3AED,#9F67F0)', title: '4. Analytics & Reports', desc: 'Comprehensive dashboards, financial reports, and actionable insights for temple management' },
    ];

    const missionCards = [
        { icon: '🕉', iconBg: 'linear-gradient(135deg,#E85D26,#FF7A1A)', title: 'Smart Digitization', desc: 'Transform temple operations with reverent technology that honors traditions while embracing innovation.', link: 'Learn More' },
        { icon: '👥', iconBg: 'linear-gradient(135deg,#E85D26,#C44A1A)', title: 'Divine Community', desc: 'Strengthen spiritual bonds that unite devotees across the globe. Create meaningful connections that transcend boundaries.', link: 'Explore Community' },
        { icon: '📊', iconBg: 'linear-gradient(135deg,#7C3AED,#9F67F0)', title: 'Wisdom Analytics', desc: 'Make enlightened decisions guided by comprehensive insights. Transform information into wisdom that serves the greater purpose.', link: 'Discover Insights' },
    ];

    const statsData = [
        { number: '500+', label: 'Active Temples' },
        { number: '10M+', label: 'Devotees Served' },
        { number: '99.9%', label: 'Uptime' },
        { number: '24/7', label: 'Support' },
    ];

    const ecosystemItems = [
        { icon: '🕉', title: 'Spiritual Services', desc: 'Puja bookings, religious ceremonies, and spiritual guidance' },
        { icon: '💰', title: 'Financial Management', desc: 'Donations, expenses, inventory, and financial transparency' },
        { icon: '👥', title: 'Community Building', desc: 'Devotee engagement, events, and spiritual community growth' },
    ];

    const whyChooseData = [
        { icon: '⚡', iconBg: 'linear-gradient(135deg,#10B981,#059669)', title: 'Quick Setup', desc: 'Get your temple online in just 24 hours with our guided setup process. No technical expertise required.', points: ['One-click installation', 'Data migration assistance', 'Staff training included', '24/7 setup support'] },
        { icon: '📡', iconBg: 'linear-gradient(135deg,#3B82F6,#2563EB)', title: 'Offline + Online Support', desc: 'Works seamlessly both online and offline. Temple operations continue uninterrupted even during internet outages.', points: ['Offline-first architecture', 'Auto-sync capabilities', 'Local data backup', 'Progressive web app'] },
        { icon: '🔒', iconBg: 'linear-gradient(135deg,#E85D26,#C44A1A)', title: 'Secure Data Handling', desc: 'Bank-grade security with end-to-end encryption, regular backups, and compliance with international standards.', points: ['256-bit SSL encryption', 'Daily automated backups', 'GDPR compliant', 'Role-based access control'] },
        { icon: '📈', iconBg: 'linear-gradient(135deg,#7C3AED,#9F67F0)', title: 'Scalable for All Temples', desc: 'From small community temples to large institutional complexes, PRASADM scales effortlessly.', points: ['Small temple starter plans', 'Enterprise-grade features', 'Unlimited devotee accounts', 'Multi-location support'] },
    ];


    // ===== RENDER FUNCTIONS =====

    function renderFeatures() {
        var container = document.getElementById('featuresGrid');
        if (!container) return;
        var html = '';
        for (var i = 0; i < features.length; i++) {
            var f = features[i];
            html += '<div class="col-lg-4 col-md-6">';
            html += '  <div class="feature-card">';
            html += '    <div class="feature-icon-box" style="background:' + f.bg + ';">' + f.icon + '</div>';
            html += '    <h3 class="feature-card-title">' + f.title + '</h3>';
            html += '    <p class="feature-card-desc">' + f.desc + '</p>';
            html += '    <a href="features.html" class="explore-link">Explore Feature →</a>';
            html += '  </div>';
            html += '</div>';
        }
        container.innerHTML = html;
    }

    function renderSteps() {
        var container = document.getElementById('stepsGrid');
        if (!container) return;
        var html = '';
        for (var i = 0; i < steps.length; i++) {
            var s = steps[i];
            html += '<div class="col-lg-3 col-md-6">';
            html += '  <div class="step-card">';
            if (i < steps.length - 1) {
                html += '    <div class="step-arrow">›</div>';
            }
            html += '    <div class="step-icon-box" style="background:' + s.iconBg + ';">' + s.icon + '</div>';
            html += '    <h3 class="step-number">' + s.title + '</h3>';
            html += '    <p style="color:#888; font-size:0.85rem; line-height:1.6;">' + s.desc + '</p>';
            html += '  </div>';
            html += '</div>';
        }
        container.innerHTML = html;
    }

    function renderMission() {
        var container = document.getElementById('missionGrid');
        if (!container) return;
        var html = '';
        for (var i = 0; i < missionCards.length; i++) {
            var c = missionCards[i];
            html += '<div class="col-lg-4 col-md-6">';
            html += '  <div class="mission-card">';
            html += '    <div class="feature-icon-box" style="background:' + c.iconBg + ';">' + c.icon + '</div>';
            html += '    <h3 style="font-weight:700; font-size:1.1rem; margin-bottom:0.75rem; color:#1A1A2E;">' + c.title + '</h3>';
            html += '    <p style="color:#777; font-size:0.9rem; line-height:1.6; margin-bottom:1.25rem;">' + c.desc + '</p>';
            html += '    <a href="features.html" class="explore-link">' + c.link + ' →</a>';
            html += '  </div>';
            html += '</div>';
        }
        container.innerHTML = html;
    }

    function renderStats() {
        var container = document.getElementById('statsGrid');
        if (!container) return;
        var html = '';
        for (var i = 0; i < statsData.length; i++) {
            var s = statsData[i];
            html += '<div class="col-lg-3 col-md-6">';
            html += '  <div class="stat-number">' + s.number + '</div>';
            html += '  <div class="stat-label">' + s.label + '</div>';
            html += '</div>';
        }
        container.innerHTML = html;
    }

    function renderEcosystem() {
        var container = document.getElementById('ecosystemGrid');
        if (!container) return;
        var html = '';
        for (var i = 0; i < ecosystemItems.length; i++) {
            var item = ecosystemItems[i];
            html += '<div class="col-lg-4 col-md-6">';
            html += '  <div class="ecosystem-card">';
            html += '    <div class="ecosystem-card-icon">' + item.icon + '</div>';
            html += '    <h3 class="ecosystem-card-title">' + item.title + '</h3>';
            html += '    <p class="ecosystem-card-desc">' + item.desc + '</p>';
            html += '  </div>';
            html += '</div>';
        }
        container.innerHTML = html;
    }

    function renderWhyChoose() {
        var container = document.getElementById('whyChooseGrid');
        if (!container) return;
        var html = '';
        for (var i = 0; i < whyChooseData.length; i++) {
            var item = whyChooseData[i];
            html += '<div class="col-lg-6 col-md-12">';
            html += '  <div class="why-card">';
            html += '    <div class="d-flex gap-3 align-items-start">';
            html += '      <div class="why-card-icon" style="background:' + item.iconBg + ';">' + item.icon + '</div>';
            html += '      <div>';
            html += '        <h3 class="why-card-title">' + item.title + '</h3>';
            html += '        <p class="why-card-desc">' + item.desc + '</p>';
            html += '        <ul style="list-style:none; padding:0; margin:0;">';
            for (var j = 0; j < item.points.length; j++) {
                html += '          <li class="why-card-point">• ' + item.points[j] + '</li>';
            }
            html += '        </ul>';
            html += '      </div>';
            html += '    </div>';
            html += '  </div>';
            html += '</div>';
        }
        container.innerHTML = html;
    }


    // ===== INIT =====

    document.addEventListener('DOMContentLoaded', function() {
        renderFeatures();
        renderSteps();
        renderMission();
        renderStats();
        renderEcosystem();
        renderWhyChoose();
    });

})();