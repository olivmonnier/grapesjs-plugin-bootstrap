export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

export const getModel = (editor, type) => editor.DomComponents.getType(type).model

export const getView = (editor, type) => editor.DomComponents.getType(type).view
