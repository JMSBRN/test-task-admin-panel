const sxPaginationStyle = {
    '.MuiToolbar-root': {
      position: 'absolute',
      left: '5px',
      bottom: '20px',
    },
    '.MuiPagination-ul': {
      marginLeft: '21px',
      width: '300px',
      '& li': {
        marginLeft: '-5px',
      },
      '& .MuiPaginationItem-previousNext': {
        width: '33px',
        height: '30px',
        border: '1px solid lightgrey',
        borderRadius: '5px',
        marginLeft: '10px',
      },
    },
    '.Mui-selected': {
      width: '36px',
      height: '34px',
      border: '1px solid darkBlue',
      borderRadius: '5px',
      marginLeft: '21px',
    },
  };

export default sxPaginationStyle;