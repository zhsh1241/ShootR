﻿using System;
using System.Collections.Generic;

namespace ShootR
{
    public class Payload
    {
        public Payload()
        {
            Ships = new List<object>();
            Bullets = new List<object>();
        }

        public List<object> Ships { get; set; }
        public List<object> Bullets { get; set; }
        public int ShipsInWorld { get; set; }
        public int BulletsInWorld { get; set; }
    }
}