const AppData = {
    admins: [
        {
            id: 1,
            username: 'admin',
            password: 'admin123',
            name: '系统管理员',
            role: 'super_admin',
            permissions: ['villager', 'points', 'rules', 'stats', 'settings']
        },
        {
            id: 2,
            username: 'manager',
            password: 'manager123',
            name: '村务管理员',
            role: 'manager',
            permissions: ['villager', 'points', 'stats']
        }
    ],

    users: [
        {
            id: 1,
            username: 'user1',
            password: '123456',
            name: '张明',
            idCard: '330***********1234',
            village: '幸福村',
            villageGroup: '第一组',
            phone: '138****8888',
            registerDate: '2024-01-15',
            status: 'active',
            level: '优秀村民',
            levelPoints: 85,
            totalPoints: 85,
            rank: 3
        },
        {
            id: 2,
            username: 'user2',
            password: '123456',
            name: '李华',
            idCard: '330***********5678',
            village: '幸福村',
            villageGroup: '第二组',
            phone: '139****6666',
            registerDate: '2024-02-20',
            status: 'active',
            level: '模范村民',
            levelPoints: 145,
            totalPoints: 168,
            rank: 1
        },
        {
            id: 3,
            username: 'user3',
            password: '123456',
            name: '王芳',
            idCard: '330***********9012',
            village: '幸福村',
            villageGroup: '第三组',
            phone: '137****5555',
            registerDate: '2024-03-10',
            status: 'active',
            level: '良好村民',
            levelPoints: 65,
            totalPoints: 72,
            rank: 5
        },
        {
            id: 4,
            username: 'user4',
            password: '123456',
            name: '赵强',
            idCard: '330***********3456',
            village: '幸福村',
            villageGroup: '第一组',
            phone: '136****4444',
            registerDate: '2024-01-05',
            status: 'active',
            level: '普通村民',
            levelPoints: 35,
            totalPoints: 38,
            rank: 8
        },
        {
            id: 5,
            username: 'user5',
            password: '123456',
            name: '陈静',
            idCard: '330***********7890',
            village: '幸福村',
            villageGroup: '第二组',
            phone: '135****3333',
            registerDate: '2024-04-15',
            status: 'active',
            level: '优秀村民',
            levelPoints: 95,
            totalPoints: 102,
            rank: 2
        },
        {
            id: 6,
            username: 'user6',
            password: '123456',
            name: '刘洋',
            idCard: '330***********2345',
            village: '和平村',
            villageGroup: '第一组',
            phone: '134****2222',
            registerDate: '2024-02-28',
            status: 'active',
            level: '良好村民',
            levelPoints: 58,
            totalPoints: 65,
            rank: 4
        },
        {
            id: 7,
            username: 'user7',
            password: '123456',
            name: '周伟',
            idCard: '330***********6789',
            village: '和平村',
            villageGroup: '第二组',
            phone: '133****1111',
            registerDate: '2024-03-22',
            status: 'inactive',
            level: '普通村民',
            levelPoints: 25,
            totalPoints: 28,
            rank: 10
        },
        {
            id: 8,
            username: 'user8',
            password: '123456',
            name: '吴敏',
            idCard: '330***********0123',
            village: '和平村',
            villageGroup: '第三组',
            phone: '132****0000',
            registerDate: '2024-05-01',
            status: 'active',
            level: '普通村民',
            levelPoints: 42,
            totalPoints: 45,
            rank: 7
        },
        {
            id: 9,
            username: 'user9',
            password: '123456',
            name: '郑豪',
            idCard: '330***********4567',
            village: '幸福村',
            villageGroup: '第三组',
            phone: '131****9999',
            registerDate: '2024-04-10',
            status: 'active',
            level: '良好村民',
            levelPoints: 72,
            totalPoints: 78,
            rank: 4
        },
        {
            id: 10,
            username: 'user10',
            password: '123456',
            name: '冯丽',
            idCard: '330***********8901',
            village: '和平村',
            villageGroup: '第一组',
            phone: '130****8888',
            registerDate: '2024-06-15',
            status: 'active',
            level: '普通村民',
            levelPoints: 18,
            totalPoints: 20,
            rank: 11
        }
    ],

    pointsRecords: [
        {
            id: 1,
            userId: 1,
            type: 'add',
            points: 10,
            reason: '积极参与村容村貌整治活动',
            category: '环境卫生',
            date: '2024-12-20',
            time: '09:30',
            operatorId: 1
        },
        {
            id: 2,
            userId: 1,
            type: 'add',
            points: 5,
            reason: '帮助邻居老人搬运重物',
            category: '邻里互助',
            date: '2024-12-18',
            time: '15:20',
            operatorId: 1
        },
        {
            id: 3,
            userId: 1,
            type: 'deduct',
            points: 3,
            reason: '门前三包责任落实不到位',
            category: '环境卫生',
            date: '2024-12-15',
            time: '10:00',
            operatorId: 2
        },
        {
            id: 4,
            userId: 1,
            type: 'add',
            points: 15,
            reason: '在抗旱救灾中表现突出',
            category: '其他规定',
            date: '2024-12-10',
            time: '08:00',
            operatorId: 1
        },
        {
            id: 5,
            userId: 1,
            type: 'add',
            points: 8,
            reason: '参加村级文艺演出',
            category: '公共秩序',
            date: '2024-12-05',
            time: '19:00',
            operatorId: 1
        },
        {
            id: 6,
            userId: 1,
            type: 'deduct',
            points: 5,
            reason: '在公共场合大声喧哗',
            category: '公共秩序',
            date: '2024-12-01',
            time: '14:30',
            operatorId: 2
        },
        {
            id: 7,
            userId: 1,
            type: 'add',
            points: 12,
            reason: '主动调解邻里纠纷',
            category: '邻里互助',
            date: '2024-11-28',
            time: '11:00',
            operatorId: 1
        },
        {
            id: 8,
            userId: 1,
            type: 'add',
            points: 10,
            reason: '参加志愿服务活动',
            category: '其他规定',
            date: '2024-11-20',
            time: '09:00',
            operatorId: 1
        },
        {
            id: 9,
            userId: 1,
            type: 'add',
            points: 20,
            reason: '举报违法行为',
            category: '公共秩序',
            date: '2024-11-15',
            time: '16:00',
            operatorId: 1
        },
        {
            id: 10,
            userId: 1,
            type: 'deduct',
            points: 2,
            reason: '乱扔垃圾',
            category: '环境卫生',
            date: '2024-11-10',
            time: '08:30',
            operatorId: 2
        },
        {
            id: 11,
            userId: 2,
            type: 'add',
            points: 15,
            reason: '带领村民开展环境整治',
            category: '环境卫生',
            date: '2024-12-22',
            time: '10:00',
            operatorId: 1
        },
        {
            id: 12,
            userId: 2,
            type: 'add',
            points: 20,
            reason: '调解成功邻里矛盾',
            category: '邻里互助',
            date: '2024-12-20',
            time: '14:00',
            operatorId: 1
        },
        {
            id: 13,
            userId: 3,
            type: 'add',
            points: 10,
            reason: '参加文艺汇演',
            category: '公共秩序',
            date: '2024-12-18',
            time: '19:30',
            operatorId: 1
        },
        {
            id: 14,
            userId: 4,
            type: 'deduct',
            points: 5,
            reason: '房前屋后卫生不达标',
            category: '环境卫生',
            date: '2024-12-15',
            time: '09:00',
            operatorId: 2
        },
        {
            id: 15,
            userId: 5,
            type: 'add',
            points: 25,
            reason: '发现并报告安全隐患',
            category: '公共秩序',
            date: '2024-12-10',
            time: '08:00',
            operatorId: 1
        }
    ],

    villageRules: [
        {
            id: 1,
            title: '维护公共卫生',
            content: '村民应当保持自家门前屋后的清洁卫生，不随意乱扔垃圾，不在公共区域堆放杂物。实行门前三包责任制，包卫生、包秩序、包设施。',
            category: 'environment',
            categoryName: '环境卫生',
            points: 5,
            status: 'active',
            updateDate: '2024-01-01',
            updateBy: 1
        },
        {
            id: 2,
            title: '邻里和睦相处',
            content: '村民应当相互尊重、和睦相处，不搬弄是非，不挑拨离间。遇到纠纷应当通过协商或找村委会调解解决，不得激化矛盾。',
            category: 'civil',
            categoryName: '邻里互助',
            points: 10,
            status: 'active',
            updateDate: '2024-01-01',
            updateBy: 1
        },
        {
            id: 3,
            title: '遵守公共秩序',
            content: '村民应当遵守国家法律法规和村规民约，服从村委会管理。在公共场所应当遵守秩序，不得大声喧哗、酗酒闹事。',
            category: 'public',
            categoryName: '公共秩序',
            points: 5,
            status: 'active',
            updateDate: '2024-01-01',
            updateBy: 1
        },
        {
            id: 4,
            title: '爱护公共设施',
            content: '村民应当爱护村内公共设施，包括道路、路灯、健身器材等。发现损坏应当及时报告，不得故意损坏或占用。',
            category: 'public',
            categoryName: '公共秩序',
            points: 3,
            status: 'active',
            updateDate: '2024-01-01',
            updateBy: 1
        },
        {
            id: 5,
            title: '参与环境整治',
            content: '村民应当积极参加村容村貌整治活动，自觉清理自家范围内的垃圾杂物，配合村里开展的环境卫生整治行动。',
            category: 'environment',
            categoryName: '环境卫生',
            points: 10,
            status: 'active',
            updateDate: '2024-01-01',
            updateBy: 1
        },
        {
            id: 6,
            title: '互帮互助',
            content: '村民应当发扬互帮互助精神，关心帮助孤寡老人、残疾人等弱势群体。在紧急情况下应当相互支援。',
            category: 'civil',
            categoryName: '邻里互助',
            points: 8,
            status: 'active',
            updateDate: '2024-01-01',
            updateBy: 1
        },
        {
            id: 7,
            title: '婚丧嫁娶报备',
            content: '村民办理婚丧嫁娶等大事，应当提前向村委会报备，服从村里的统一安排，倡导移风易俗，文明节俭办事。',
            category: 'other',
            categoryName: '其他规定',
            points: 2,
            status: 'active',
            updateDate: '2024-01-01',
            updateBy: 1
        },
        {
            id: 8,
            title: '禁止赌博行为',
            content: '村民不得参与赌博活动，不得开设赌场或提供赌博场所。发现赌博行为应当及时制止并向村委会报告。',
            category: 'public',
            categoryName: '公共秩序',
            points: -20,
            status: 'active',
            updateDate: '2024-01-01',
            updateBy: 1
        },
        {
            id: 9,
            title: '保护生态环境',
            content: '村民应当保护村庄生态环境，不得随意砍伐树木，不得在河道、农田倾倒垃圾或有害物质。',
            category: 'environment',
            categoryName: '环境卫生',
            points: 10,
            status: 'active',
            updateDate: '2024-01-01',
            updateBy: 1
        },
        {
            id: 10,
            title: '参与公益活动',
            content: '村民应当积极参加村级公益活动和志愿服务，包括但不限于：环境整治、治安巡逻、文艺演出等。每次参与可获得相应积分。',
            category: 'other',
            categoryName: '其他规定',
            points: 5,
            status: 'active',
            updateDate: '2024-01-01',
            updateBy: 1
        },
        {
            id: 11,
            title: '规范养殖行为',
            content: '村民养殖畜禽应当圈养，不得散养造成环境污染。养殖废弃物应当妥善处理，不得直接排放。',
            category: 'environment',
            categoryName: '环境卫生',
            points: 5,
            status: 'active',
            updateDate: '2024-01-01',
            updateBy: 1
        },
        {
            id: 12,
            title: '邻里纠纷调解',
            content: '发生邻里纠纷时，双方应当保持冷静，通过友好协商解决。协商不成的可申请村委会调解，调解成功可获得积分奖励。',
            category: 'civil',
            categoryName: '邻里互助',
            points: 5,
            status: 'active',
            updateDate: '2024-01-01',
            updateBy: 1
        }
    ],

    levels: [
        { name: '普通村民', minPoints: 0, maxPoints: 49 },
        { name: '良好村民', minPoints: 50, maxPoints: 79 },
        { name: '优秀村民', minPoints: 80, maxPoints: 119 },
        { name: '模范村民', minPoints: 120, maxPoints: 199 },
        { name: '最美村民', minPoints: 200, maxPoints: 999999 }
    ],

    villages: [
        { id: 1, name: '幸福村', groupCount: 3 },
        { id: 2, name: '和平村', groupCount: 3 }
    ],

    statistics: {
        totalVillagers: 10,
        activeVillagers: 9,
        totalPoints: 999,
        avgPoints: 90.8,
        monthAddPoints: 156,
        monthDeductPoints: 25
    },

    exchangeItems: [
        {
            id: 1,
            name: '优质大米5kg',
            description: '本地优质大米，口感香糯',
            pointsRequired: 50,
            category: 'food',
            categoryName: '粮油副食',
            stock: 100,
            image: '🍚',
            status: 'available'
        },
        {
            id: 2,
            name: '食用油1L',
            description: '非转基因食用油，营养健康',
            pointsRequired: 80,
            category: 'food',
            categoryName: '粮油副食',
            stock: 80,
            image: '🫒',
            status: 'available'
        },
        {
            id: 3,
            name: '洗衣液2kg',
            description: '温和不伤手，持久清香',
            pointsRequired: 60,
            category: 'daily',
            categoryName: '日用百货',
            stock: 120,
            image: '🧴',
            status: 'available'
        },
        {
            id: 4,
            name: '洗洁精1瓶',
            description: '高效去油，食品级安全',
            pointsRequired: 30,
            category: 'daily',
            categoryName: '日用百货',
            stock: 150,
            image: '🫧',
            status: 'available'
        },
        {
            id: 5,
            name: '牙膏套装',
            description: '美白护齿，清新口气',
            pointsRequired: 45,
            category: 'daily',
            categoryName: '日用百货',
            stock: 90,
            image: '🪥',
            status: 'available'
        },
        {
            id: 6,
            name: '卫生纸4卷',
            description: '柔软舒适，居家必备',
            pointsRequired: 25,
            category: 'daily',
            categoryName: '日用百货',
            stock: 200,
            image: '🧻',
            status: 'available'
        },
        {
            id: 7,
            name: '不锈钢餐具套装',
            description: '耐用美观，易清洗',
            pointsRequired: 150,
            category: 'home',
            categoryName: '家居用品',
            stock: 40,
            image: '🍽️',
            status: 'available'
        },
        {
            id: 8,
            name: '保温杯',
            description: '304不锈钢，24小时保温',
            pointsRequired: 120,
            category: 'home',
            categoryName: '家居用品',
            stock: 50,
            image: '☕',
            status: 'available'
        },
        {
            id: 9,
            name: '雨伞',
            description: '晴雨两用，防紫外线',
            pointsRequired: 80,
            category: 'home',
            categoryName: '家居用品',
            stock: 60,
            image: '☔',
            status: 'available'
        },
        {
            id: 10,
            name: '风扇',
            description: '静音节能，强劲送风',
            pointsRequired: 200,
            category: 'home',
            categoryName: '家居用品',
            stock: 20,
            image: '🌀',
            status: 'available'
        },
        {
            id: 11,
            name: '儿童绘本',
            description: '启蒙教育，健康成长',
            pointsRequired: 70,
            category: 'culture',
            categoryName: '文化教育',
            stock: 70,
            image: '📚',
            status: 'available'
        },
        {
            id: 12,
            name: '文具套装',
            description: '学生必备，品质优良',
            pointsRequired: 55,
            category: 'culture',
            categoryName: '文化教育',
            stock: 85,
            image: '✏️',
            status: 'available'
        },
        {
            id: 13,
            name: '图书卡',
            description: '村级图书馆借阅卡一张',
            pointsRequired: 100,
            category: 'culture',
            categoryName: '文化教育',
            stock: 30,
            image: '📖',
            status: 'available'
        },
        {
            id: 14,
            name: '体检套餐',
            description: '基础健康体检一次',
            pointsRequired: 500,
            category: 'health',
            categoryName: '健康医疗',
            stock: 15,
            image: '🏥',
            status: 'available'
        },
        {
            id: 15,
            name: '血压计',
            description: '家用电子血压计',
            pointsRequired: 180,
            category: 'health',
            categoryName: '健康医疗',
            stock: 25,
            image: '💓',
            status: 'available'
        }
    ],

    exchangeRecords: []
};
