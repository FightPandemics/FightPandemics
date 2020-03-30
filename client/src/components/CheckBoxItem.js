import { Form } from "react-bootstrap"
import React from "react"

const CHECKBOX_STYLES = {
    display: 'flex',
    border: '1px solid #bbb',
    borderRadius: '3px',
    padding: '15px',
    margin: '15px 50px 15px 0',
};

const CHECKBOX_INPUT_STYLES = {
    cursor: 'pointer',
    margin: '15px',
    position: 'relative',
};

const CHECKBOX_LABEL_STYLES = {
    cursor: 'pointer',
    display: 'block',
    margin: '15px',
};

export const CheckBoxItem = ({ id, label, onSelect }) => {
    return (
        <Form.Check style={CHECKBOX_STYLES} type="radio" id={id}>
            <Form.Check.Input style={CHECKBOX_INPUT_STYLES} type="radio" onChange={onSelect} />
            <Form.Check.Label style={CHECKBOX_LABEL_STYLES}>
                {label}
            </Form.Check.Label>
        </Form.Check>
    );
};


