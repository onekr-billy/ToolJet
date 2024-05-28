import React from 'react';
import { components } from 'react-select';
import SolidIcon from '@/_ui/Icon/SolidIcons';
import Loader from '@/ToolJetUI/Loader/Loader';
import './dropdownV2.scss';
import { noop } from 'lodash';
import { FormCheck } from 'react-bootstrap';

const { MenuList } = components;

const CustomMenuList = ({ selectProps, ...props }) => {
  const {
    onInputChange,
    inputValue,
    onMenuInputFocus,
    showAllOption,
    isSelectAllSelected,
    optionsLoadingState,
    handleSelectAll = noop,
  } = selectProps;
  return (
    <div className="dropdown-widget-custom-menu-list" onClick={(e) => e.stopPropagation()}>
      <div className="dropdown-widget-search-box-wrapper">
        {!inputValue && (
          <span className="">
            <SolidIcon name="search01" width="14" />
          </span>
        )}
        <input
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
          type="text"
          value={inputValue}
          onChange={(e) =>
            onInputChange(e.currentTarget.value, {
              action: 'input-change',
            })
          }
          onMouseDown={(e) => {
            e.stopPropagation();
            e.target.focus();
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
            e.target.focus();
          }}
          onFocus={onMenuInputFocus}
          placeholder="Search..."
          className="dropdown-widget-search-box"
          // ref={inputRef} // Assign the ref to the input search box
        />
      </div>
      {showAllOption && !optionsLoadingState && (
        <div className="multiselect-custom-menulist-select-all">
          <FormCheck checked={isSelectAllSelected} onChange={handleSelectAll} />
          <span style={{ marginLeft: '4px' }}>Select all</span>
        </div>
      )}
      <MenuList {...props} selectProps={selectProps}>
        {optionsLoadingState ? (
          <div class="text-center py-4" style={{ minHeight: '188px' }}>
            <Loader style={{ zIndex: 3, position: 'absolute' }} width="36" />
          </div>
        ) : (
          props.children
        )}
      </MenuList>
    </div>
  );
};

export default CustomMenuList;
