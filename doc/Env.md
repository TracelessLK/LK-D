## isDev
- 如果isDev是"true", 则整个app为开发模式,否则为生产模式
    1. 当app处于开发模式时,加载`http://localhost:3000`,生产模式加载build/index.html
    2. 当app处于开发模式时,自动打开开发者工具
    3. 当app处于开发模式时,抛出unhandledRejection, unhandledException, 生产模式下截获后log and report
    4. 当app处于开发模式时,webpack的config.mode 是 'development'
    
## BROWSER
- 设置为none, 防止开发模式打开网页

