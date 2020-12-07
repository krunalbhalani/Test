import React from 'react'
import styled from "styled-components";



const LimitedTextarea = ({ rows, cols, value, limit, onChange, name, id, error }) => {
    const [content, setContent] = React.useState(value.slice(0, limit));
  
    const setFormattedContent = React.useCallback(
      text => {
        setContent(text.slice(0, limit));
        onChange(text)
      },
      [limit, setContent]
    );

    return (
      <div>
        <textarea
          rows={rows}
          cols={cols}
          name={name}
          id={id}
          onChange={event => setFormattedContent(event.target.value)}
          value={content}
        />
         {error.description &&
            <span className="tool_tip">{error.description}</span>
        }
        <div className="fieldlabel">
          {content.length}/{limit}
        </div>
        
      </div>
    );
  };

  export default LimitedTextarea