import React from 'react'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


export interface ToolbarItemProps {
    items: { name: string, action: () => void }[],
    itemName: string;
    uuid: string;
}

function ToolbarItem({ items, itemName, uuid }: ToolbarItemProps) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button aria-controls={uuid} aria-haspopup="true" onClick={handleClick} style={{
                color: 'white',
                fontSize: '12px',
            }}>
                {itemName}
            </Button>
            <Menu
                id={uuid}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {items.map(item => <MenuItem onClick={e => item.action()}>{item.name}</MenuItem>)}
            </Menu>
        </>
    )
}

export default ToolbarItem
