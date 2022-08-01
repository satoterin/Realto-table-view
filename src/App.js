// Import Node Packages
import { useEffect, useState } from 'react';
import axios from 'axios';

// Import Custom Components
import DetailedView from './components/DetailedView/DetailedVeiw';

// Import Constants
import { MOCK_UP_URL } from './utils/constants';

// Import Styles
import './App.css';

function App() {
  const [tableData, setTableData] = useState();

  // Set the initial state of the selected row as -1 { -1: invisible, from 0~ : visible state }
  const [selectedRow, setSelectedRow] = useState(-1);

  // Set the sort based field for table data
  const [sortedField, setSortedField] = useState({
    field: "unset",
    order: "up"
  });

  // Initialize & fetch the data from the mocking up server
  useEffect(() => {
    axios.get(MOCK_UP_URL)
    .then(res => {
      console.log('Data from Mock up server', res);
      setTableData(res?.data?.data);
    })
    .catch(err => {
      console.error('Error occured on Fetching data from mocking up server', err);
    })
  }, []);

  // Hanlder of changing the sort field
  useEffect(() => {
    console.log('sortedField', sortedField)

    let _sortedData = tableData;
    
    _sortedData = _sortedData.sort((a, b) => {
      let fieldA = a[sortedField.field].toLowerCase(),
          fieldB = b[sortedField.field].toLowerCase() 
      const _order = sortedField.order

      if (fieldA > fieldB) {
        return _order === "up" ? 1 : -1
      } else if (fieldB > fieldA) {
        return _order === "up" ? -1 : 1
      }

      return 0
    })
  }, [sortedField])

  // Sort clickable hanlder
  const handleSetSortField = (field) => {
    if (sortedField.field !== field) {
      setSortedField({
        field: field,
        order: "up"
      })
    } else {
      setSortedField({
        field: field,
        order: sortedField.order === "up" ? "down" : "up"
      })
    }
  }

  return (
    <div className="App">
      <div className="table-container">
        <h2>Arnold Test - Table View</h2>
        <table>
          <thead>
            <th>ID</th>
            <th>Email</th>
            <th onClick={() => handleSetSortField('first_name')}>First Name</th>
            <th onClick={() => handleSetSortField('last_name')}>Last Name</th>
            <th>Avatar</th>
          </thead>
          <tbody>
            {
              tableData?.map((row, key) => 
              <tr onClick={() => setSelectedRow(key)}>
                <td>{row.id}</td>
                <td>{row.email}</td>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.avatar}</td>
              </tr>)
            }
          </tbody>
        </table>

        {
          selectedRow !== -1 && <DetailedView data={tableData[selectedRow]} close={() => setSelectedRow(-1)} />
        }
      </div>
    </div>
  );
}

export default App;
