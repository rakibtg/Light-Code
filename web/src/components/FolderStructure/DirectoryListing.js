import React, { useState, useEffect } from "react";
import "./DirectoryListing.css";
const isPathInside = require("is-path-inside");

const newMenu = (label, type, path, child) => {
  return {
    label,
    type,
    path,
    child
  };
};

const menus = [
  newMenu("public", "directory", "/public", [
    newMenu("vs", "directory", "/public/vs/", [
      newMenu("base", "directory", "/public/vs/base/", [
        newMenu("base-loader.js", "file", "/public/vs/base/base-loader.js", [])
      ]),
      newMenu("loader.js", "file", "/public/vs/loader.js", []),
      newMenu("index.html", "file", "/public/vs/index.html", [])
    ])
  ]),
  newMenu("App.js", "file", "/src/App.js", [])
];
const flatMenus = [];
const flatMenuItem = (menu, depth = false) => {
  if (!depth) depth = 0;
  if (menu.label) {
    flatMenus.push({
      depth: depth - 1,
      show: depth - 1 === 0 ? true : false,
      ...menu
    });
    if (menu.child) {
      if (menu.child.length > 0) flatMenuItem(menu.child, depth);
    }
  } else {
    menu.map((m, i) => flatMenuItem(m, depth + 1));
  }
  return flatMenus;
};

function DirectoryListing() {
  const [folderStructure, setFolderStructure] = useState([]);

  useEffect(() => {
    setFolderStructure(flatMenuItem(menus));
  }, []);

  const handleMenuClick = menu => {
    console.log(menu);
    if (menu.type === "directory") {
      const childDepth = menu.depth + 1;
      const showMenu = item => {
        if (item.show === true && isPathInside(item.path, menu.path)) {
          return false;
        } else if (item.depth <= childDepth) {
          return true;
        } else {
          return false;
        }
      };
      const nextDirectoryListings = folderStructure.map(item => {
        return {
          ...item,
          show: showMenu(item)
        };
      });
      setFolderStructure(nextDirectoryListings);
    }
  };

  return (
    <div className="directory_listing_wrapper">
      {folderStructure.map(
        (item, index) =>
          item.show && (
            <div
              className="folder_items_wrapper default_folder_items_style"
              key={index}
              onClick={() => handleMenuClick(item)}
            >
              <div
                className="folder_items_container"
                style={{ paddingLeft: item.depth * 16 }}
              >
                <div className="item_icon"></div>
                <div className="item_name">{item.label}</div>
              </div>
            </div>
          )
      )}
    </div>
  );
}

export default DirectoryListing;
