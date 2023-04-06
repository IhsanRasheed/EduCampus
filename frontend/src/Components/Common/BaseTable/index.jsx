import React from "react";
import DataTable from "react-data-table-component";

const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };
const customStyles = {
  headCells: {
    style: {
      backgroundColor: "#262626",
      textAlign: "center",
      fontSize: "16px",
      fontWeight: "bold",
      color: "white",
      
    },
  },
  columns:{
    Style: {
      width: '20px'
    }
  },

  cells: {
    style: {
      fontSize: "14px",
      width: '4px',
      color: "#222222",
      backgroundColor: "#FFFFFF",
    },
  },
  pagination: {
    style: {
      backgroundColor: "#EEEEEE",
      color: "black",
    },
  },
};
function index(props) {
  return (
    <div className="w-full m-4 overflow-auto" style={{ padding:'1px',  }}>
      <DataTable
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        highlightOnHover
        selectableRowsComponentProps={selectProps}
        customStyles={customStyles}
        {...props}
      />
    </div>
  );
}

export default index;