import mongoose from 'mongoose';


let ListSchema=new mongoose.Schema({
    id:{
        type:Number
    },
    content:String,
    check:{
        type:Boolean,
        default:false
    }
})

let Listmodel = mongoose.model('List',ListSchema);
export default Listmodel;