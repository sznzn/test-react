import mongoose from 'mongoose'

//这段代码运行在服务器上，不是浏览器中
if(process.argv.length<3){
    //process.argv是命令行参数的数组
    //process.argv[0]是Node.js可执行文件路径
    //process.argv[1]是当前脚本文件路径
    //process.argv[2]是第一个命令行参数（密码）
    console.log('give password as argument')
    process.exit(1)
    // 0 表示正常退出，1 表示异常退出
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@fullstackopen.ordhr6f.mongodb.net/noteApp?retryWrites=true&w=majority&appName=FullStackOpen`

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String, 
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'HTML is easy',
    important: true,
})

note.save().then(result => {
console.log('note saved!')
mongoose.connection.close()
})