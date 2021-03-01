import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { requestUsers } from '../../redux/usersReducer';
import { getCurrentPage, getFilter, getIsFetching, getPageSize } from '../../redux/usersSelectors';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';
import * as queryString from 'querystring';

const UserPage = () => {
  const isFetching = useSelector(getIsFetching);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();
  const history = useHistory();

  type QueryParamsType = {
    term?: string;
    page?: string;
    friend?: string;
  };

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType;
    let actualFilter = filter;
    let actualPage = currentPage;

    if (!!parsed.page) actualPage = Number(parsed.page);
    if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string };

    switch (parsed.friend) {
      case 'null':
        actualFilter = { ...actualFilter, friend: null };
        break;
      case 'true':
        actualFilter = { ...actualFilter, friend: true };
        break;
      case 'false':
        actualFilter = { ...actualFilter, friend: false };
        break;

      default:
        break;
    }

    dispatch(requestUsers(actualPage, pageSize, actualFilter));
  }, []);

  useEffect(() => {
    const query: QueryParamsType = {};
    if (!!filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);

    history.push({
      pathname: '/users',
      search: queryString.stringify(query),
    });
  }, [filter, currentPage]);

  console.log(isFetching);
  return (
    <>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  );
};

export default UserPage;
