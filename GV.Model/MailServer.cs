﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GV.Model
{
    public class MailServer
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool EnableSSL { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
        public int TimeOut { get; set; }
    }
}
