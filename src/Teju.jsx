import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function Teju() {
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
    const filteredData = data.filter((item) => item.id === id);
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


  return (
    <>
          <div>
            <div className='addTodo'>
              <div className=''>
                <input value={inputValue} onChange={(e) => handleChange(e)} type="text" placeholder='Enter Here' className='input' />
                {isUpdate ?
                  <button className='saveUpdate' onClick={() => handleUpdate()}>Update</button>
                  :
                  <div onClick={() => handleAdd()}>
                    <FaCirclePlus size={50}/>
                  </div>
    
    
                  // <button className='saveUpdate' onClick={() => handleAdd()}>
                  //   <FaBeer color='black' />
                  // </button>
                }
              </div>
            </div>
    
            <br></br>
            {/* Examples to renter data on UI */}
            {/* {c.name}
            {
              b.map((item)=>{
                return(
                  <div>{item.name}</div>
                )
              })
            }
    
            {a.map((ele) => {
              return(<p>{ele}</p>)
            })} */}
            {data.map((ele, index) => {
              const { todo, id, isComplete } = ele;
              return (
                <div key={id}>
                  <input className='checkBox' type='checkbox' onChange={(e) => handleCheckBox(e, id)} ></input>
                  <span style={isComplete ? { "textDecoration": "line-through" } : {}}>{todo}</span>
                  {!isComplete ?
                    <>
                      <button className='saveUpdate' onClick={() => handleDelete(id)}>delete</button>
                      <button className='saveUpdate' onClick={() => handleEdit(id)}>Edit</button>
                    </>
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

export default Teju
