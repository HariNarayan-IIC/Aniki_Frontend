export const createResource = (id, title, url, type = 'link') => ({
  id,
  title,
  url,
  type
});

export const createNodeStyle = (backgroundColor = '#3b82f6', textColor = '#ffffff', borderColor = '#1d4ed8', borderWidth = 2, borderRadius = 8, width = 200, height = 100) => ({
  backgroundColor,
  textColor,
  borderColor,
  borderWidth,
  borderRadius,
  width,
  height
});

export const createRoadmapNodeData = (title, description, resources = [], style = null) => ({
  label,
  description,
  resources,
  style: style || createNodeStyle()
});

export const createRoadmapData = (id, title, description, nodes = [], edges = []) => ({
  id,
  title,
  description,
  nodes,
  edges,
  createdAt: new Date(),
  updatedAt: new Date()
});
