import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { SvgProps } from "../../../components/Svg";
import * as IconModule from "../icons";
import Accordion from "./Accordion";
import { MenuEntry, LinkLabel, LinkStatus } from "./MenuEntry";
import MenuLink from "./MenuLink";
import { PanelProps, PushedProps } from "../types";
import Logo from "./Logo";

interface Props extends PanelProps, PushedProps {
  isMobile: boolean;
}

const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> };

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  // overflow-y: hidden;
  // overflow-x: auto;
  height: 100%;
  // background-color: #102648;
  // padding-left: 100px;
`;

const Btn = styled.button`
  background-color: #007bff;
  border-radius: 15px;
  color: #fff;
  border: 0;
  padding: 5px 10px;
  margin-left: 350px;
  // margin-right: -100px;
`;

const PanelBody: React.FC<Props> = ({ isPushed, pushNav, isMobile, links }) => {
  const location = useLocation();

  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined;

  return (
    <>
      <Container>
        <Logo href="/" />
        {links.map((entry) => {
          const Icon = Icons[entry.icon];
          const iconElement = <Icon style={{ color: "green" }} width="32px" mr="8px" />;
          const calloutClass = entry.calloutClass ? entry.calloutClass : undefined;

          if (entry.items) {
            const itemsMatchIndex = entry.items.findIndex((item) => item.href === location.pathname);
            const initialOpenState = entry.initialOpenState === true ? entry.initialOpenState : itemsMatchIndex >= 0;

            return (
              <Accordion
                key={entry.label}
                isPushed={isPushed}
                pushNav={pushNav}
                icon={iconElement}
                label={entry.label}
                status={entry.status}
                initialOpenState={initialOpenState}
                className={calloutClass}
                isActive={entry.items.some((item) => item.href === location.pathname)}
              >
                {isPushed &&
                  entry.items.map((item) => (
                    <MenuEntry
                      key={item.href}
                      secondary
                      isActive={item.href === location.pathname}
                      onClick={handleClick}
                    >
                      <MenuLink href={item.href}>
                        <LinkLabel isPushed={isPushed}>{item.label}</LinkLabel>
                        {item.status && (
                          <LinkStatus color={item.status.color} fontSize="14px">
                            {item.status.text}
                          </LinkStatus>
                        )}
                      </MenuLink>
                    </MenuEntry>
                  ))}
              </Accordion>
            );
          }
          return (
            <MenuEntry key={entry.label} isActive={entry.href === location.pathname} className={calloutClass}>
              <MenuLink href={entry.href} onClick={handleClick}>
                {iconElement}
                <LinkLabel isPushed={isPushed}>{entry.label}</LinkLabel>
              </MenuLink>
            </MenuEntry>
          );
        })}
        <Btn>Connect</Btn>
      </Container>
    </>
  );
};

export default PanelBody;
