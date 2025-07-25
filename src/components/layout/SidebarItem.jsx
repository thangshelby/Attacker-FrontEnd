const SidebarItem = ({ icon, text, active, alert }) => {
  return (
    <li>
      {icon}
      <span>{text} </span>
    </li>
  );
};

export default SidebarItem;
