import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { FaCirclePlus } from "react-icons/fa6";
import { RiChatUploadFill } from "react-icons/ri";
import { RiDeleteBin4Fill } from "react-icons/ri";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";

function App() {
  const [data, setData] = useState([]);
  console.log(data);

  const [inputValue, setValue] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateContext, setUpdateContext] = useState({});


  const handleChange = (e) => {
    const val = e.target.value
    setValue(val);
  }

  const handleAdd = () => {
    if (inputValue.trim() == "") return

    let tempData = {
      id: new Date().getTime(),
      todo: inputValue,
      isComplete: false
    }

    setData([...data, tempData])
    setValue("")


    //ARRAY EG = ["akash", "kumar"] // old implementatiom
    // setData([...data, inputValue])//important
    // setValue('')
  }

  const handleEdit = (id) => {
    setIsUpdate(true)
    const tempData = data.filter((item) => item.id == id);
    let todo = tempData[0].todo;
    setUpdateContext(tempData[0]);
    setValue(todo)
  }


  const handleUpdate = () => {
    const index = data.findIndex((item) => item.id == updateContext.id);
    let tempObj = {
      id: updateContext.id,
      todo: inputValue,
      isComplete: updateContext.isComplete
    }

    let tempData = [...data];
    tempData[index] = tempObj;
    setData(tempData)
    setValue("");
    setIsUpdate(false);
  }

  const handleDelete = (id) => {
    const filteredData = data.filter((item) => item.id !== id);
    setData(filteredData)

  }

  const handleCheckBox = (e, id) => {
    const isChecked = e.target.checked;

    const index = data.findIndex((item) => item.id == id)
    const targetObj = data.filter((item) => item.id == id)

    const tempObj = {
      id: id,
      todo: targetObj[0].todo,
      isComplete: isChecked
    }

    const tempData = [...data]

    tempData[index] = tempObj

    setData(tempData)

  }


  // let c = { name: "Akash" };
  // let b = [{ name: "Akash" }, { name: "Teju" }]
  // let a = [1, 2, 3, 4];

  return (
    <>
      <div className='todoList'>
        <div className='addTodo'>
          <div className='addTask'>
            <input value={inputValue} onChange={(e) => handleChange(e)} type="text" placeholder='Enter Here' className='input' />
            {isUpdate ?
              <div className='button' onClick={() => handleUpdate()}>
                <RiChatUploadFill size={40}/>
              </div>
              :
              <div className='button' onClick={() => handleAdd()}>
                <FaCirclePlus size={40}/>
              </div>


              // <button className='saveUpdate' onClick={() => handleAdd()}>
              //   <FaBeer color='black' />
              // </button>
            }
          </div>
        </div>

        <br></br>
        {data.map((ele, index) => {
          const { todo, id, isComplete } = ele;
          return (
            <div className='taskList' key={id}>
              {/* <div type='checkbox' onChange={(e) => handleCheckBox(e, id)}>
                <RiCheckboxBlankCircleLine />
              </div> */}
              <div className='content'>
              <input className='checkBox' type='checkbox' onChange={(e) => handleCheckBox(e, id)} ></input>
              <div className={isComplete ? 'strike-out' : 'content-text' }>{todo}</div>
              </div>
              {!isComplete ?
                <div className='btns'>
                  <div className='button' onClick={() => handleDelete(id)}>
                    <RiDeleteBin4Fill size={40}/>
                  </div>
                  <div className='button' onClick={() => handleEdit(id)}>
                    <BiSolidMessageSquareEdit size={40}/>
                  </div>
                </div>
                :
                null
              }
            </div>
          )
        })}

      </div>
    </>
  )
}

export default App
