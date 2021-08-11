import React from "react"
// import { render } from "react-dom"
import { Menu, MenuItem, Divider } from "react-desktop-menus"

// const action = () => console.log("hello")

export default function MenuView() {
    return (
        <Menu keyboard>
            <MenuItem action={action} label="Simple item" />
            <MenuItem action={action} icon={<i className="glyphicon glyphicon-road" />} label="Item with icon" />
            <MenuItem action={action} icon={<img src="build/icon.svg" />} label="Item with any kind of icon" />
            <MenuItem disabled label="Item disabled" icon={<i className="glyphicon glyphicon-headphones" />} />
            <Divider />
            <MenuItem action={action} label="Custom hover color" activeColor="pink" />
            <MenuItem action={action} checkbox> Item as a checkbox </MenuItem>
            <MenuItem action={action} checkbox defaultChecked> Item as a checkbox checked </MenuItem>
            <MenuItem action={action} icon={<i className="fa fa-modx" />} shortcut="s" label="Item with shortcut" />
            <MenuItem action={action} icon={<i className="glyphicon glyphicon-print" />} info="Info" label="Item with info" />
            <MenuItem icon={<i className="fa fa-bar-chart" />} label="Submenu">
                <Menu>
                    <MenuItem action={action} label="Simple item" />
                    <MenuItem action={action} icon={<i className="glyphicon glyphicon-road" />} label="Item with icon" />
                    <MenuItem action={action} icon={<img src="build/icon.svg" />} label="Item with any kind of icon" />
                </Menu>
            </MenuItem>
        </Menu>
    );
}
