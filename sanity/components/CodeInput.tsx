import React from 'react'
import { TextArea } from '@sanity/ui'
import { StringInputProps, set, unset } from 'sanity'

const CodeInput = React.forwardRef<HTMLTextAreaElement, StringInputProps>((props, ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = event.target.value
        props.onChange(value ? set(value) : unset())
    }

    return (
        <TextArea
            {...props}
            ref={ref}
            rows={10}
            style={{ fontFamily: 'monospace' }}
            onChange={handleChange}
        />
    )
})

CodeInput.displayName = 'CodeInput'

export default CodeInput
