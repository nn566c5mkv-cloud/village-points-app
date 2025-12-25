class VillagePointsApp {
    constructor() {
        this.currentUser = null;
        this.currentTab = 'home';
        this.init();
        this.registerServiceWorker();
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js')
                    .then(registration => {
                        console.log('ServiceWorker registered:', registration.scope);
                    })
                    .catch(error => {
                        console.log('ServiceWorker registration failed:', error);
                    });
            });
        }
    }

    init() {
        this.bindEvents();
        this.checkLoginStatus();
        this.setDefaultDates();
    }

    bindEvents() {
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.handleLogout();
        });

        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const tab = item.dataset.tab;
                this.switchTab(tab);
            });
        });

        document.querySelectorAll('.action-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                this.handleAction(action);
            });
        });

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterPoints(btn.dataset.filter);
            });
        });

        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchPoints(e.target.value);
        });

        document.getElementById('filterDateBtn').addEventListener('click', () => {
            this.filterHistoryByDate();
        });

        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterRules(btn.dataset.category);
            });
        });

        document.getElementById('closePointsModal').addEventListener('click', () => {
            this.closeModal('pointsDetailModal');
        });

        document.getElementById('closeRuleModal').addEventListener('click', () => {
            this.closeModal('ruleDetailModal');
        });

        document.getElementById('pointsDetailModal').addEventListener('click', (e) => {
            if (e.target.id === 'pointsDetailModal') {
                this.closeModal('pointsDetailModal');
            }
        });

        document.getElementById('ruleDetailModal').addEventListener('click', (e) => {
            if (e.target.id === 'ruleDetailModal') {
                this.closeModal('ruleDetailModal');
            }
        });

        document.getElementById('changePasswordBtn').addEventListener('click', () => {
            this.showToast('密码修改功能开发中');
        });

        document.getElementById('feedbackBtn').addEventListener('click', () => {
            this.showToast('意见反馈功能开发中');
        });

        document.getElementById('villagerSearchInput')?.addEventListener('input', (e) => {
            this.searchVillagers(e.target.value);
        });

        document.getElementById('closeVillagerDetailModal')?.addEventListener('click', () => {
            this.closeModal('villagerDetailModal');
        });

        document.getElementById('villagerDetailModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'villagerDetailModal') {
                this.closeModal('villagerDetailModal');
            }
        });

        document.querySelectorAll('.category-btn[data-exchange-category]')?.forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.category-btn[data-exchange-category]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterExchangeItems(btn.dataset.exchangeCategory);
            });
        });

        document.getElementById('closeExchangeModal')?.addEventListener('click', () => {
            this.closeModal('exchangeModal');
        });

        document.getElementById('exchangeModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'exchangeModal') {
                this.closeModal('exchangeModal');
            }
        });

        document.getElementById('closeExchangeRecordsModal')?.addEventListener('click', () => {
            this.closeModal('exchangeRecordsModal');
        });

        document.getElementById('exchangeRecordsModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'exchangeRecordsModal') {
                this.closeModal('exchangeRecordsModal');
            }
        });
    }

    checkLoginStatus() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showMainPage();
        } else {
            this.showLoginPage();
        }
    }

    handleLogin() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        const user = AppData.users.find(u => u.username === username && u.password === password);
        const admin = AppData.admins.find(a => a.username === username && a.password === password);

        if (admin) {
            this.currentUser = { ...admin, userType: 'admin' };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.showToast(`管理员 ${admin.name} 登录成功`);
            this.showMainPage();
        } else if (user) {
            this.currentUser = { ...user, userType: 'villager' };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.showToast('登录成功');
            this.showMainPage();
        } else {
            this.showToast('用户名或密码错误');
        }
    }

    handleLogout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        this.showToast('已退出登录');
        this.showLoginPage();
    }

    isAdmin() {
        return this.currentUser && this.currentUser.userType === 'admin';
    }

    hasPermission(permission) {
        if (!this.isAdmin()) return false;
        return this.currentUser.permissions.includes(permission);
    }

    showLoginPage() {
        document.getElementById('loginPage').classList.add('active');
        document.getElementById('mainPage').classList.remove('active');
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }

    showMainPage() {
        document.getElementById('loginPage').classList.remove('active');
        document.getElementById('mainPage').classList.add('active');
        this.updateUserInfo();
        
        if (this.isAdmin()) {
            this.showAdminInterface();
        } else {
            this.showVillagerInterface();
        }
    }

    showAdminInterface() {
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = '');
        document.querySelectorAll('.villager-only').forEach(el => el.style.display = '');
        document.getElementById('adminWelcome').textContent = `管理员: ${this.currentUser.name}`;
        document.getElementById('adminRole').textContent = this.getRoleName(this.currentUser.role);
        this.loadAdminDashboard();
    }

    showVillagerInterface() {
        document.querySelectorAll('.admin-only').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.villager-only').forEach(el => el.style.display = '');
        this.loadPointsRecords();
        this.loadHistoryRecords();
        this.loadVillageRules();
        this.loadRecentActivity();
    }

    getRoleName(role) {
        const roleNames = {
            'super_admin': '超级管理员',
            'manager': '村务管理员',
            'stats_admin': '统计管理员'
        };
        return roleNames[role] || role;
    }

    loadAdminDashboard() {
        this.loadStatistics();
        this.loadVillagerManagement();
        this.loadPointsManagement();
    }

    loadStatistics() {
        const stats = AppData.statistics;
        document.getElementById('totalVillagers').textContent = stats.totalVillagers;
        document.getElementById('activeVillagers').textContent = stats.activeVillagers;
        document.getElementById('totalPoints').textContent = stats.totalPoints;
        document.getElementById('avgPoints').textContent = stats.avgPoints;
        document.getElementById('monthAddPoints').textContent = stats.monthAddPoints;
        document.getElementById('monthDeductPoints').textContent = stats.monthDeductPoints;

        this.loadPointsChart();
    }

    loadPointsChart() {
        const container = document.getElementById('pointsChart');
        if (!container) return;

        const addRecords = AppData.pointsRecords.filter(r => r.type === 'add');
        const deductRecords = AppData.pointsRecords.filter(r => r.type === 'deduct');
        const addTotal = addRecords.reduce((sum, r) => sum + r.points, 0);
        const deductTotal = deductRecords.reduce((sum, r) => sum + r.points, 0);

        container.innerHTML = `
            <div class="chart-bar">
                <div class="bar-label">加分</div>
                <div class="bar-container">
                    <div class="bar-fill add" style="width: ${Math.min((addTotal / (addTotal + deductTotal + 1)) * 100, 100)}%"></div>
                </div>
                <div class="bar-value">${addTotal} 分</div>
            </div>
            <div class="chart-bar">
                <div class="bar-label">扣分</div>
                <div class="bar-container">
                    <div class="bar-fill deduct" style="width: ${Math.min((deductTotal / (addTotal + deductTotal + 1)) * 100, 100)}%"></div>
                </div>
                <div class="bar-value">${deductTotal} 分</div>
            </div>
        `;
    }

    loadVillagerManagement() {
        const container = document.getElementById('villagerList');
        if (!container) return;

        const villagers = AppData.users;
        
        container.innerHTML = villagers.map(villager => `
            <div class="villager-item" data-id="${villager.id}">
                <div class="villager-info">
                    <div class="villager-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="villager-details">
                        <h4>${villager.name}</h4>
                        <span>${villager.village} · ${villager.villageGroup}</span>
                        <span>积分: ${villager.totalPoints} · 排名: 第 ${villager.rank} 名</span>
                    </div>
                </div>
                <div class="villager-level">${villager.level}</div>
            </div>
        `).join('');

        container.querySelectorAll('.villager-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                this.showVillagerDetail(id);
            });
        });
    }

    showVillagerDetail(id) {
        const villager = AppData.users.find(u => u.id === id);
        if (!villager) return;

        const content = document.getElementById('villagerDetailContent');
        if (!content) return;

        const villagerRecords = AppData.pointsRecords.filter(r => r.userId === id);
        const totalAdd = villagerRecords.filter(r => r.type === 'add').reduce((sum, r) => sum + r.points, 0);
        const totalDeduct = villagerRecords.filter(r => r.type === 'deduct').reduce((sum, r) => sum + r.points, 0);

        content.innerHTML = `
            <div class="detail-header">
                <div class="detail-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <h3>${villager.name}</h3>
                <span class="detail-level">${villager.level}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">用户名</span>
                <span class="detail-value">${villager.username}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">所属村庄</span>
                <span class="detail-value">${villager.village} · ${villager.villageGroup}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">联系电话</span>
                <span class="detail-value">${villager.phone}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">注册时间</span>
                <span class="detail-value">${villager.registerDate}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">当前积分</span>
                <span class="detail-value" style="color: var(--primary-color); font-weight: bold;">${villager.totalPoints} 分</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">积分排名</span>
                <span class="detail-value">第 ${villager.rank} 名</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">账户状态</span>
                <span class="detail-value" style="color: ${villager.status === 'active' ? 'var(--success-color)' : 'var(--danger-color)'}">${villager.status === 'active' ? '正常' : '冻结'}</span>
            </div>
            <div class="detail-stats">
                <div class="detail-stat add">
                    <span>总加分</span>
                    <strong>${totalAdd}</strong>
                </div>
                <div class="detail-stat deduct">
                    <span>总扣分</span>
                    <strong>${totalDeduct}</strong>
                </div>
                <div class="detail-stat">
                    <span>记录数</span>
                    <strong>${villagerRecords.length}</strong>
                </div>
            </div>
        `;

        document.getElementById('villagerDetailModal').classList.add('active');
    }

    searchVillagers(keyword) {
        const container = document.getElementById('villagerList');
        if (!container) return;

        const villagers = AppData.users.filter(u => 
            u.name.includes(keyword) || 
            u.village.includes(keyword) ||
            u.username.includes(keyword)
        );

        if (villagers.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <p>未找到相关村民</p>
                </div>
            `;
            return;
        }

        container.innerHTML = villagers.map(villager => `
            <div class="villager-item" data-id="${villager.id}">
                <div class="villager-info">
                    <div class="villager-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="villager-details">
                        <h4>${villager.name}</h4>
                        <span>${villager.village} · ${villager.villageGroup}</span>
                        <span>积分: ${villager.totalPoints} · 排名: 第 ${villager.rank} 名</span>
                    </div>
                </div>
                <div class="villager-level">${villager.level}</div>
            </div>
        `).join('');

        container.querySelectorAll('.villager-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                this.showVillagerDetail(id);
            });
        });
    }

    loadPointsManagement() {
        const container = document.getElementById('pointsRecordsList');
        if (!container) return;

        const records = AppData.pointsRecords.slice(0, 20);
        
        container.innerHTML = records.map(record => {
            const user = AppData.users.find(u => u.id === record.userId);
            return `
                <div class="points-record-item" data-id="${record.id}">
                    <div class="record-info">
                        <h4>${record.reason}</h4>
                        <span>${user ? user.name : '未知'} · ${record.date} · ${record.category}</span>
                    </div>
                    <div class="record-value ${record.type}">
                        ${record.type === 'add' ? '+' : ''}${record.points}
                    </div>
                </div>
            `;
        }).join('');
    }

    updateUserInfo() {
        const user = this.currentUser;

        document.getElementById('userName').textContent = user.name;
        document.getElementById('userVillage').textContent = user.village;
        document.getElementById('totalPoints').textContent = user.totalPoints;
        document.getElementById('pointsRank').textContent = `第 ${user.rank} 名`;

        document.getElementById('profileName').textContent = user.name;
        document.getElementById('profileId').textContent = String(user.id).padStart(3, '0');
        document.getElementById('profileVillage').textContent = user.village;
        document.getElementById('profilePhone').textContent = user.phone;
        document.getElementById('profileRegister').textContent = user.registerDate;
        document.getElementById('profileLevel').textContent = user.level;

        const progressPercent = ((user.levelPoints - this.getLevelMinPoints(user.level)) / (this.getLevelMaxPoints(user.level) - this.getLevelMinPoints(user.level))) * 100;
        document.getElementById('levelProgress').style.width = `${Math.min(progressPercent, 100)}%`;
        document.getElementById('currentLevel').textContent = user.level;
        document.getElementById('nextLevel').textContent = `还需 ${user.nextLevelPoints - user.levelPoints} 分升级到${user.nextLevel}`;
    }

    getLevelMinPoints(levelName) {
        const level = AppData.levels.find(l => l.name === levelName);
        return level ? level.minPoints : 0;
    }

    getLevelMaxPoints(levelName) {
        const level = AppData.levels.find(l => l.name === levelName);
        return level ? level.maxPoints : 999999;
    }

    switchTab(tab) {
        this.currentTab = tab;

        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.tab === tab);
        });

        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        const tabContent = document.getElementById(`${tab}Tab`);
        if (tabContent) {
            tabContent.classList.add('active');
        }

        const titles = {
            home: '首页',
            query: '积分查询',
            history: '历史记录',
            rules: '村规民约',
            exchange: '积分兑换',
            profile: '个人信息'
        };
        document.getElementById('pageTitle').textContent = titles[tab] || '首页';

        if (tab === 'exchange') {
            this.loadExchangePage();
        }
    }

    handleAction(action) {
        const actionMap = {
            query: 'query',
            history: 'history',
            rules: 'rules',
            profile: 'profile'
        };
        this.switchTab(actionMap[action]);
    }

    loadPointsRecords(filter = 'all') {
        const records = AppData.pointsRecords.filter(r => r.userId === this.currentUser.id);
        const container = document.getElementById('pointsList');

        let filteredRecords = records;
        if (filter === 'add') {
            filteredRecords = records.filter(r => r.type === 'add');
        } else if (filter === 'deduct') {
            filteredRecords = records.filter(r => r.type === 'deduct');
        }

        if (filteredRecords.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <p>暂无积分记录</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredRecords.map(record => `
            <div class="points-item" data-id="${record.id}">
                <div class="points-item-info">
                    <h4>${record.reason}</h4>
                    <span>${record.date} · ${record.category}</span>
                </div>
                <div class="points-item-value ${record.type}">
                    ${record.type === 'add' ? '+' : ''}${record.points}
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.points-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                this.showPointsDetail(id);
            });
        });
    }

    loadHistoryRecords() {
        const records = AppData.pointsRecords.filter(r => r.userId === this.currentUser.id);
        const container = document.getElementById('historyList');

        this.updateHistorySummary(records);

        if (records.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-history"></i>
                    <p>暂无历史记录</p>
                </div>
            `;
            return;
        }

        container.innerHTML = records.map(record => `
            <div class="points-item" data-id="${record.id}">
                <div class="points-item-info">
                    <h4>${record.reason}</h4>
                    <span>${record.date} ${record.time} · ${record.category}</span>
                </div>
                <div class="points-item-value ${record.type}">
                    ${record.type === 'add' ? '+' : ''}${record.points}
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.points-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                this.showPointsDetail(id);
            });
        });
    }

    updateHistorySummary(records) {
        const total = records.reduce((sum, r) => sum + (r.type === 'add' ? r.points : -r.points), 0);
        const addCount = records.filter(r => r.type === 'add').length;
        const deductCount = records.filter(r => r.type === 'deduct').length;

        document.getElementById('historyTotal').textContent = total;
        document.getElementById('historyAdd').textContent = addCount;
        document.getElementById('historyDeduct').textContent = deductCount;
    }

    loadVillageRules(category = 'all') {
        let rules = AppData.villageRules;

        if (category !== 'all') {
            rules = rules.filter(r => r.category === category);
        }

        const container = document.getElementById('rulesList');

        if (rules.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-book"></i>
                    <p>暂无村规民约</p>
                </div>
            `;
            return;
        }

        container.innerHTML = rules.map(rule => `
            <div class="rule-item" data-id="${rule.id}">
                <div class="rule-header">
                    <h4>${rule.title}</h4>
                    <span class="rule-points">${rule.points > 0 ? '+' : ''}${rule.points} 分</span>
                </div>
                <p>${rule.content}</p>
                <div class="rule-footer">
                    <span class="rule-category">${rule.categoryName}</span>
                    <span class="rule-date">更新时间: ${rule.updateDate}</span>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.rule-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                this.showRuleDetail(id);
            });
        });
    }

    loadRecentActivity() {
        const records = AppData.pointsRecords
            .filter(r => r.userId === this.currentUser.id)
            .slice(0, 5);

        const container = document.getElementById('activityList');

        if (records.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-bell-slash"></i>
                    <p>暂无最近动态</p>
                </div>
            `;
            return;
        }

        container.innerHTML = records.map(record => `
            <div class="activity-item">
                <div class="activity-icon ${record.type}">
                    <i class="fas ${record.type === 'add' ? 'fa-plus-circle' : 'fa-minus-circle'}"></i>
                </div>
                <div class="activity-content">
                    <p>${record.reason}</p>
                    <span>${record.date} · ${record.category}</span>
                </div>
                <div class="activity-points ${record.type}">
                    ${record.type === 'add' ? '+' : ''}${record.points}
                </div>
            </div>
        `).join('');
    }

    filterPoints(filter) {
        this.loadPointsRecords(filter);
    }

    searchPoints(keyword) {
        const records = AppData.pointsRecords.filter(r =>
            r.userId === this.currentUser.id &&
            (r.reason.includes(keyword) || r.category.includes(keyword))
        );
        const container = document.getElementById('pointsList');

        if (records.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <p>未找到相关记录</p>
                </div>
            `;
            return;
        }

        container.innerHTML = records.map(record => `
            <div class="points-item" data-id="${record.id}">
                <div class="points-item-info">
                    <h4>${record.reason}</h4>
                    <span>${record.date} · ${record.category}</span>
                </div>
                <div class="points-item-value ${record.type}">
                    ${record.type === 'add' ? '+' : ''}${record.points}
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.points-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                this.showPointsDetail(id);
            });
        });
    }

    filterHistoryByDate() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        let records = AppData.pointsRecords.filter(r => r.userId === this.currentUser.id);

        if (startDate) {
            records = records.filter(r => r.date >= startDate);
        }
        if (endDate) {
            records = records.filter(r => r.date <= endDate);
        }

        const container = document.getElementById('historyList');
        this.updateHistorySummary(records);

        if (records.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <p>该时间段内无记录</p>
                </div>
            `;
            return;
        }

        container.innerHTML = records.map(record => `
            <div class="points-item" data-id="${record.id}">
                <div class="points-item-info">
                    <h4>${record.reason}</h4>
                    <span>${record.date} ${record.time} · ${record.category}</span>
                </div>
                <div class="points-item-value ${record.type}">
                    ${record.type === 'add' ? '+' : ''}${record.points}
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.points-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.dataset.id);
                this.showPointsDetail(id);
            });
        });
    }

    filterRules(category) {
        this.loadVillageRules(category);
    }

    showPointsDetail(id) {
        const record = AppData.pointsRecords.find(r => r.id === id);
        if (!record) return;

        const content = document.getElementById('pointsDetailContent');
        content.innerHTML = `
            <div class="detail-row">
                <span class="detail-label">积分类型</span>
                <span class="detail-value" style="color: ${record.type === 'add' ? 'var(--success-color)' : 'var(--danger-color)'}">
                    ${record.type === 'add' ? '加分' : '扣分'}
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">积分变动</span>
                <span class="detail-value" style="color: ${record.type === 'add' ? 'var(--success-color)' : 'var(--danger-color)'}; font-size: 18px; font-weight: bold;">
                    ${record.type === 'add' ? '+' : ''}${record.points} 分
                </span>
            </div>
            <div class="detail-row">
                <span class="detail-label">变动原因</span>
                <span class="detail-value">${record.reason}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">所属类别</span>
                <span class="detail-value">${record.category}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">变动日期</span>
                <span class="detail-value">${record.date}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">变动时间</span>
                <span class="detail-value">${record.time}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">记录编号</span>
                <span class="detail-value">#${String(record.id).padStart(6, '0')}</span>
            </div>
        `;

        document.getElementById('pointsDetailModal').classList.add('active');
    }

    showRuleDetail(id) {
        const rule = AppData.villageRules.find(r => r.id === id);
        if (!rule) return;

        const content = document.getElementById('ruleDetailContent');
        content.innerHTML = `
            <div class="detail-row">
                <span class="detail-label">规则标题</span>
                <span class="detail-value" style="font-weight: bold;">${rule.title}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">规则类别</span>
                <span class="detail-value">${rule.categoryName}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">积分奖励</span>
                <span class="detail-value" style="color: ${rule.points > 0 ? 'var(--success-color)' : 'var(--danger-color)'}">
                    ${rule.points > 0 ? '+' : ''}${rule.points} 分
                </span>
            </div>
            <div class="detail-row" style="flex-direction: column; align-items: flex-start;">
                <span class="detail-label" style="margin-bottom: 8px;">规则内容</span>
                <span class="detail-value" style="text-align: justify; line-height: 1.8;">${rule.content}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">更新时间</span>
                <span class="detail-value">${rule.updateDate}</span>
            </div>
        `;

        document.getElementById('ruleDetailModal').classList.add('active');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }

    setDefaultDates() {
        const today = new Date();
        const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
        
        document.getElementById('startDate').value = firstDay.toISOString().split('T')[0];
        document.getElementById('endDate').value = today.toISOString().split('T')[0];
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        
        toastMessage.textContent = message;
        toast.classList.add('active');
        
        setTimeout(() => {
            toast.classList.remove('active');
        }, 2500);
    }

    loadExchangePage() {
        const userPoints = this.currentUser.totalPoints || 0;
        document.getElementById('myExchangePoints').textContent = userPoints;
        this.renderExchangeItems('all');
    }

    renderExchangeItems(category = 'all') {
        const container = document.getElementById('exchangeList');
        const userPoints = this.currentUser.totalPoints || 0;

        let items = AppData.exchangeItems;
        if (category !== 'all') {
            items = items.filter(item => item.category === category);
        }

        if (items.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-gift"></i>
                    <p>暂无兑换物品</p>
                </div>
            `;
            return;
        }

        container.innerHTML = items.map(item => {
            const canAfford = userPoints >= item.pointsRequired;
            const hasStock = item.stock > 0;
            const isAvailable = canAfford && hasStock;

            return `
                <div class="exchange-item ${!isAvailable ? 'disabled' : ''}" data-id="${item.id}">
                    <div class="exchange-image">${item.image}</div>
                    <div class="exchange-info">
                        <h4>${item.name}</h4>
                        <p>${item.description}</p>
                    </div>
                    <div class="exchange-footer">
                        <div>
                            <div class="exchange-points">${item.pointsRequired} 积分</div>
                            <div class="exchange-stock">剩余 ${item.stock} 件</div>
                        </div>
                    </div>
                    <button class="exchange-btn" ${!isAvailable ? 'disabled' : ''}>
                        ${!hasStock ? '已兑完' : !canAfford ? '积分不足' : '立即兑换'}
                    </button>
                </div>
            `;
        }).join('');

        container.querySelectorAll('.exchange-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.classList.contains('exchange-btn')) {
                    const id = parseInt(item.dataset.id);
                    this.showExchangeDetail(id);
                } else {
                    const id = parseInt(item.dataset.id);
                    const exchangeItem = AppData.exchangeItems.find(i => i.id === id);
                    if (exchangeItem && exchangeItem.stock > 0) {
                        this.showExchangeDetail(id);
                    }
                }
            });
        });
    }

    filterExchangeItems(category) {
        this.renderExchangeItems(category);
    }

    showExchangeDetail(itemId) {
        const item = AppData.exchangeItems.find(i => i.id === itemId);
        if (!item) return;

        const userPoints = this.currentUser.totalPoints || 0;
        const canAfford = userPoints >= item.pointsRequired;

        const content = document.getElementById('exchangeModalContent');
        content.innerHTML = `
            <div class="exchange-confirm">
                <div class="exchange-image">${item.image}</div>
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <div class="exchange-detail">
                    <div class="exchange-detail-row">
                        <span>所需积分</span>
                        <span>${item.pointsRequired} 分</span>
                    </div>
                    <div class="exchange-detail-row">
                        <span>当前积分</span>
                        <span>${userPoints} 分</span>
                    </div>
                    <div class="exchange-detail-row">
                        <span>兑换后剩余</span>
                        <span style="color: ${canAfford ? 'var(--success-color)' : 'var(--danger-color)'}">
                            ${userPoints - item.pointsRequired} 分
                        </span>
                    </div>
                    <div class="exchange-detail-row">
                        <span>库存数量</span>
                        <span>${item.stock} 件</span>
                    </div>
                    <div class="exchange-detail-row">
                        <span>物品分类</span>
                        <span>${item.categoryName}</span>
                    </div>
                </div>
                <div class="exchange-actions">
                    <button class="btn-secondary" onclick="app.closeModal('exchangeModal')">取消</button>
                    <button class="btn-primary" id="confirmExchangeBtn" ${!canAfford || item.stock <= 0 ? 'disabled' : ''}>
                        确认兑换
                    </button>
                </div>
            </div>
        `;

        document.getElementById('confirmExchangeBtn').addEventListener('click', () => {
            this.confirmExchange(itemId);
        });

        document.getElementById('exchangeModal').classList.add('active');
    }

    confirmExchange(itemId) {
        const item = AppData.exchangeItems.find(i => i.id === itemId);
        if (!item) return;

        const userPoints = this.currentUser.totalPoints || 0;
        if (userPoints < item.pointsRequired) {
            this.showToast('积分不足，无法兑换');
            return;
        }

        if (item.stock <= 0) {
            this.showToast('该物品已兑换完');
            return;
        }

        item.stock--;

        const record = {
            id: AppData.exchangeRecords.length + 1,
            userId: this.currentUser.id,
            itemId: item.id,
            itemName: item.name,
            itemImage: item.image,
            pointsSpent: item.pointsRequired,
            exchangeDate: new Date().toISOString().split('T')[0],
            exchangeTime: new Date().toTimeString().split(' ')[0].substring(0, 5),
            status: 'completed'
        };

        AppData.exchangeRecords.push(record);

        this.currentUser.totalPoints -= item.pointsRequired;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

        this.closeModal('exchangeModal');
        this.showToast('兑换成功！请前往村委会领取物品');

        this.loadExchangePage();
    }

    getUserExchangeRecords() {
        if (this.currentUser.userType === 'admin') {
            return AppData.exchangeRecords;
        }
        return AppData.exchangeRecords.filter(r => r.userId === this.currentUser.id);
    }

    showExchangeRecords() {
        const records = this.getUserExchangeRecords();
        const container = document.getElementById('exchangeRecordsContent');

        if (records.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-history"></i>
                    <p>暂无兑换记录</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="exchange-records-list">
                ${records.map(record => `
                    <div class="exchange-record-item">
                        <div class="exchange-record-info">
                            <div class="exchange-image">${record.itemImage}</div>
                            <div class="exchange-record-text">
                                <h4>${record.itemName}</h4>
                                <p>消耗 ${record.pointsSpent} 积分</p>
                                <div class="exchange-record-date">${record.exchangeDate} ${record.exchangeTime}</div>
                            </div>
                        </div>
                        <div class="exchange-record-points">已兑换</div>
                    </div>
                `).join('')}
            </div>
        `;

        document.getElementById('exchangeRecordsModal').classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new VillagePointsApp();
});
