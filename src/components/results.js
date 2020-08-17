import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import MaterialTable from 'material-table';
import {
  fetchCompanies, fetchCompanyAndComments,
} from '../actions';

const Results = (props) => {
  const {
    all,
    current,
    fetchCompaniesFromServer,
    fetchCompanyWithComments,
  } = props;

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

  const renderComments = () => {
    if (Object.keys(current).length !== 0) {
      return (
        <div>
          <h3>{current.name}</h3>
          {current.comments.map((comment) => {
            const date = comment.createdAt.split('T')[0];
            return (
              <div key={comment.id}>
                <h4>
                  {comment.author}
                  , recruiting for
                  {' '}
                  {comment.recruitingFor}
                  , on
                  {' '}
                  {date}
                  :
                </h4>
                <p>{comment.text}</p>
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
