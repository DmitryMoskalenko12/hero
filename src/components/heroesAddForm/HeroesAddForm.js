
import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { heroCreated, heroesFetchingError } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
const HeroesAddForm = () => {
 const [description, setDescription] = useState('');
 const [heroName, setHeroName] = useState('');
 const [element, setElement] = useState('');
 
 const {filters, filterLoadingStatus} = useSelector(state => state.filters);
 const dispatch = useDispatch();
 const {request} = useHttp();
 
  const addItem  = (e) =>{
   e.preventDefault()
   const newItem={
    name: heroName,
    element: element,
    description: description,
    id: Date.now()
   }

   request('http://localhost:3001/heroes', 'POST', JSON.stringify(newItem))
      .then((item) => dispatch(heroCreated(item))) 
      .catch(() => dispatch(heroesFetchingError())) 

    setDescription('');
    setHeroName('');
    setElement('')
  }

  const renderFilters = (arr, status) => {
    if (status === "loading") {
        return <option>Загрузка элементов</option>
    } else if (status === "error") {
        return <option>Ошибка загрузки</option>
    }
    
    if (arr && arr.length > 0 ) {
        return arr.map(({filter, lable}) => {
            // eslint-disable-next-line
            if (filter === 'all')  return;

            return <option key={filter} value={filter}>{lable}</option>
        })
    }
}
  
    return (
        <form onSubmit={addItem} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    onChange={(e) => setHeroName(e.target.value)}
                    value={heroName}
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    value={element}
                    onChange={(e) => setElement(e.target.value)}
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option value="">Я владею элементом...</option>  
                    {renderFilters(filters, filterLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;