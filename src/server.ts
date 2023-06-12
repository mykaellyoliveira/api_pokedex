import app from './app'

function main(){
    try{
        app.listen(3000, 'localhost', async ()=>{
            console.log('Starting server on port 3000')
        })
    } catch(err){
        console.log('Starting server Error', err)

    }
}
main()