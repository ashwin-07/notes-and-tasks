import React, {useState} from 'react';

function Tasks() {

  const [content, setContent] = useState('');
 
  return (
    <div>
        Tasks
        <div className="tasksList">

        </div>
    </div>
  );
}

export default Tasks;
