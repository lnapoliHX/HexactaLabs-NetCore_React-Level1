import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

import PropTypes from "prop-types";

const renderToolbar = ({ value }) => {
  let viewButton = (
    <Link className="category-list__button" to={`/category/view/${value}`}>
      <FaSearch className="category-list__button-icon" />
    </Link>
  );

  let editButton = (
    <Link className="category-list__button" to={`/category/update/${value}`}>
      <FaEdit className="category-list__button-icon" />
    </Link>
  );

  let removeButton = (
    <Link className="category-list__button" to={`/category/remove/${value}`}>
      <FaTrash className="category-list__button-icon" />
    </Link>
  );

  return (
    <span>
      {viewButton} {editButton} {removeButton}
    </span>
  );
};

const HeaderComponent = props => {
  return (
	<h2 
	className="tableHeading"
    >
      {props.title}
    </h2>
  );
};

HeaderComponent.displayName = "HeaderComponent";

const columns = [
  {
    Header: <HeaderComponent title="Initials" />,
    accessor: "initials",
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Description" />,
    accessor: "description",
    Cell: props => props.value
  },
  {
    Header: <HeaderComponent title="Acciones" />,
    accessor: "id",
    Cell: renderToolbar
  }
];

renderToolbar.propTypes = {
  value: PropTypes.string.isRequired
};

HeaderComponent.propTypes = {
  title: PropTypes.string.isRequired
};

export default columns;
