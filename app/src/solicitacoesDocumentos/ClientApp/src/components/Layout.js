/* eslint-disable space-before-function-paren */
/* eslint-disable no-use-before-define */
import React from 'react'
// import { render } from 'react-dom';
import { Container, Row, Col } from 'reactstrap'
// eslint-disable-next-line import/no-cycle
import { Box } from '@mui/material'
import NavMenu from './NavMenu'

// import '../custom.css'

export default function Layout(props) {
  function render() {
    return (

      <div
        id="alesson"
        name="alesson"
        // className="position-relative"
        style={{
          // backgroundImage: 'radial-gradient(yellow 5%, yellow 15%, green 92%)',
          width: '100%',
          height: '100%'
        }}>
        <NavMenu />
        <Container
          style={{ maxWidth: '96%', marginLeft: '3%' }}>
          <Row>
            <Col>{props.children}</Col>
          </Row>
        </Container>
      </div>

    )
  }

  return render()
}
