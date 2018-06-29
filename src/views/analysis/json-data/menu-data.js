export default [{
		name: "应用分析",
		icon: "",
		active: "1",
		item: [{
			groupName: "应用分析",
			groupArr: [{
					subName: "应用概览",
					subRouter: "home_index",
					active: 1,
					icon: ""
				},
				{
					subName: "访问量分析",
					subRouter: "accessVolume",
					active: 2,
					icon: ""
				},
				{
					subName: "用户分析",
					subRouter: "useAnalysis",
					active: 3,
					icon: ""
				}
			]
		}]
	},
	{
		name: "运营中心",
		icon: "",
		active: 2,
		item: [{
				groupName: "客户管理",
				groupArr: [{
						subName: "客户列表",
						subRouter: "",
						active: 1,
						icon: ""
					},
					{
						subName: "权限管理",
						subRouter: "",
						active: 2,
						icon: ""
					},
					{
						subName: "合同管理",
						subRouter: "",
						active: 3,
						icon: ""
					}
				]
			},
			{
				groupName: "用户管理",
				groupArr: [{
						subName: "用户列表",
						subRouter: "user_List",
						active: 4,
						icon: ""
					},
					{
						subName: "标签管理",
						subRouter: "",
						active: 5,
						icon: ""
					},
					{
						subName: "App推送",
						subRouter: "",
						active: 6,
						icon: ""
					},
					{
						subName: "活动列表",
						subRouter: "",
						active: 7,
						icon: ""
					},
					{
						subName: "广告管理",
						subRouter: "advert",
						active: 8,
						icon: ""
					}
				]
			}
		]
	},
	{
		name: "系统设置",
		icon: "",
		active: 3,
		item: [{
				groupName: "系统设置",
				groupArr: [{
						subName: "部门管理",
						subRouter: "",
						active: 1,
						icon: ""
					},
					{
						subName: "用户管理",
						subRouter: "",
						active: 2,
						icon: ""
					},
					{
						subName: "操作日志",
						subRouter: "",
						active: 3,
						icon: ""
					},
					{
						subName: "账号设置",
						subRouter: "",
						active: 4,
						icon: ""
					}
				]
			}
		]
	}
]