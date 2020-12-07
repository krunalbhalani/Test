import React from 'react'

const LimitedTextarea = ({ rows, cols, value, limit, onChange, name, id }) => {
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
        <div>
          {content.length}/{limit}
        </div>
      </div>
    );
  };

  export default LimitedTextarea