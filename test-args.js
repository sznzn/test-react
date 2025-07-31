// 测试命令行参数
console.log('命令行参数:')
console.log('process.argv:', process.argv)
console.log('参数数量:', process.argv.length)

// 检查参数
if(process.argv.length < 3) {
    console.log('❌ 错误：请提供密码参数')
    console.log('使用方法: node test-args.js yourpassword')
    process.exit(1)
}

// 获取密码
const password = process.argv[2]
console.log('✅ 密码参数:', password)
console.log('程序继续执行...') 