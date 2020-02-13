import React from 'react';

function HelloMessage(props) {
    return <div>{props.title}! Hello {props.name}</div>;
}

module.exports = HelloMessage;