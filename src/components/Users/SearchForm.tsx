import { Field, Form, Formik } from 'formik';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { getFilter } from '../../redux/usersSelectors';
import { FilterType } from '../../types/types';
import { Box, Button, MenuItem, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../index';

const useStyles = makeStyles((tm: typeof theme) => ({
  button: {
    '&:hover': { background: '#ff3300' },
    margin: '0 10px',
    height: '36px',
    alignSelf: 'center'
  },
  box: {
    display: 'flex',
    margin: '10px',
  },
}));

type SearchFormType = {
  onSearch: (filter: FilterType) => void;
};
type FriendFormType = 'null' | 'true' | 'false';
type ValuesFormType = {
  term: string;
  friend: FriendFormType;
};
export const SearchForm: FC<SearchFormType> = ({ onSearch }) => {
  const classes = useStyles();
  const filter = useSelector(getFilter);

  return (
    <Formik
      enableReinitialize
      initialValues={{ term: filter.term, friend: String(filter.friend) as FriendFormType }}
      onSubmit={(
        values: ValuesFormType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
      ) => {
        const filter: FilterType = {
          term: values.term,
          friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false,
        };
        onSearch(filter);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Box className={classes.box}>
            <Field as={TextField} type="text" name="term" label="Enter name" color="secondary"/>
            <Field name="friend" as={Select} color="secondary">
              <MenuItem value="null">All</MenuItem>
              <MenuItem value="true">Only followed</MenuItem>
              <MenuItem value="false">Only unfollowed</MenuItem>
            </Field>
            <Button
              color="secondary"
              className={classes.button}
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Search
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
