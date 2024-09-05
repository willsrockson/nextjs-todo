import { NextResponse } from "next/server"
import supabase from "@/lib/supabaseConn";

export async function POST(req, res){
    const { todo } = await req.json()
    if(!todo){
        return
    }


    const {data, error} = await supabase
       .from('todolist')
       .insert({todo: todo})
       .select()
     
    if(error){
      return NextResponse.json({message: 'Error happened while inserting data'},{status:404})
    }else{
        return NextResponse.json(data)
    }
        
    //return NextResponse.json(data)
    
}

export async function GET(req, res) {
    const {data, error} = await supabase
      .from('todolist')
      .select()
     
      if(error){
        console.log(`Something happened`);
         return
      }
      if(data){
        return NextResponse.json(data.reverse(),{status:201})
      }

}

//DELETE
export async function DELETE(req, res) {
    const { id } = await req.json()
    console.log(typeof id);
    
    const {data, error} = await supabase
      .from('todolist')
      .delete()
      .eq('id', id)
     
      if(error){
        return NextResponse.json({message: "Couldn't delete data"},{status:404})
      }else{
          return NextResponse.json({message: "Successfuly Deleted"})
      }

}

// UPDATE
export async function PATCH(req, res) {
    const { editID, todo } = await req.json()
    console.log(editID, todo);
    
    const {data, error} = await supabase
      .from('todolist')
      .update({todo:todo})
      .eq('id', editID)
      .select()
     
      if(error){
        return NextResponse.json({message: "Couldn't update data"},{status:404})
      }else{
          return NextResponse.json(data)
      }

}


export const revalidate = 0