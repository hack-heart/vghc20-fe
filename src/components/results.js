import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import MaterialTable from 'material-table';
import Jdenticon from 'react-jdenticon';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  fetchCompanies, fetchCompanyAndComments,
} from '../actions';

const useStyles = makeStyles({
  pos: {
    marginBottom: 12,
    marginLeft: 6,
  },
});

const Results = (props) => {
  const {
    all,
    current,
    fetchCompaniesFromServer,
    fetchCompanyWithComments,
  } = props;
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const params = useParams();

  useEffect(() => {
    fetchCompaniesFromServer();
  }, [fetchCompaniesFromServer]);

  useEffect(() => {
    if (params.id !== undefined) {
      fetchCompanyWithComments(params.id);
    }
  }, [fetchCompanyWithComments, params]);

  const columns = [
    { title: 'Company', field: 'company' },
    { title: 'Tally', field: 'tally' },
    { title: 'Additional Details', field: 'additionalDetails' },
  ];

  const data = all.map(
    (companyObj) => (
      {
        company: companyObj.name,
        additionalDetails:
  <Link
    to={`/results/${companyObj.id}`}
    style={{ color: 'blue', textDecoration: 'none' }}
  >
    click here and scroll down

  </Link>,
        tally: companyObj.contacts || 0,
      }),
  );

  const generateRandomString = (string) => {
    const n = Math.ceil(Math.random() * 10);
    return string + n.toString();
  };

  const renderComments = () => {
    if (Object.keys(current).length !== 0) {
      return (
        <div>
          <h3>{current.name}</h3>
          {current.comments.map((comment) => {
            const date = comment.createdAt.split('T')[0];
            console.log(date);
            return (
              <div key={comment.id} style={{ margin: '10px' }}>
                <Card>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Jdenticon size="48" value={generateRandomString(comment.author)} />
                    <h4>{comment.author}</h4>
                  </div>
                  <Typography className={classes.pos} color="textSecondary">
                    {comment.recruitingFor}
                    {bull}
                    {date}
                  </Typography>
                  <Typography className={classes.pos}>
                    {comment.text}
                  </Typography>
                </Card>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <MaterialTable
        title="Companies Reaching Out Through the VGHC Database"
        columns={columns}
        data={data}
        options={{
          search: true,
          pageSize: 10,
        }}
      />
      <h2>Additional details</h2>
      {renderComments()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  all: state.companies.all,
  current: state.companies.current,
});

export default connect(mapStateToProps, {
  fetchCompaniesFromServer: fetchCompanies,
  fetchCompanyWithComments: fetchCompanyAndComments,
})(Results);
