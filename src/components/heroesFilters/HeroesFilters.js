import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { /* filterFetched, filterFetching, filterFetchingError, */ activeFilterElement, fetchFilters } from "../../actions";
import { useEffect } from "react";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
const {request} = useHttp();
const dispatch = useDispatch();
const {filters, activeFilter, filterLoadingStatus } = useSelector(state => state.filters);

  useEffect(() =>{
    dispatch(fetchFilters(request))
          //eslint-disable-next-line
  },[]);
  
  if (filterLoadingStatus  === "loading") {
    return <Spinner/>;
} else if (filterLoadingStatus  === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>
}

const createFilters = (filtersArr) =>{
    if (filtersArr.length === 0) {
      return <h5>Фільтрів немає</h5>
    }

    return filtersArr.map(({filter, lable, clazz })=>{
      let active = activeFilter === filter ? 'active' : null
      return(
        <button id={filter} key={filter} onClick={() => dispatch(activeFilterElement(filter))} className={`btn ${clazz} ${active}`}>{lable}</button>
      )
    })
}

  const result = createFilters(filters)
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                  {result}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;