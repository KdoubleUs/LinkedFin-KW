import React from "react";

function Pagination({ postsPerPage, totalPosts, paginate }) {
  let setOfPages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    setOfPages.push(i);
  }
  return (
    <div className="pagination-container">
      <ul className="pagination">
        {setOfPages.map(items => (
          <li key={items.id}>
            <a
              onClick={e => {
                e.preventDefault();
                //when i click on page 5 items is going to be on 5. thus
                //5 will be passed in to the function paginate
                //the function paginate will be catch in the appjs file
                console.log(items);
                //  console.log(paginate(items));
                //why does this still work lol ?????? the console log is still calling the function
                return paginate(items);
              }}
              href="#"
              className="pagelink"
            >
              {items}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
