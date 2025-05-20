'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function SubnetCalculator() {
  const [ipAddress, setIpAddress] = useState('192.168.1.1');
  const [subnetMask, setSubnetMask] = useState('255.255.255.0');
  const [results, setResults] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const calculateSubnet = (e) => {
    e.preventDefault();
    
    try {
      const ipParts = ipAddress.split('.').map(Number);
      const maskParts = subnetMask.split('.').map(Number);
      
      // Validate inputs
      if (ipParts.length !== 4 || maskParts.length !== 4 || 
          ipParts.some(isNaN) || maskParts.some(isNaN)) {
        throw new Error('Invalid IP address or subnet mask');
      }

      // Calculate network address
      const networkAddress = ipParts.map((part, i) => part & maskParts[i]).join('.');

      // Calculate broadcast address
      const invertedMask = maskParts.map(part => ~part & 0xFF);
      const broadcastAddress = ipParts.map((part, i) => part | invertedMask[i]).join('.');

      // Calculate usable host range
      const firstHost = [...networkAddress.split('.').map(Number)];
      firstHost[3] += 1;
      const lastHost = [...broadcastAddress.split('.').map(Number)];
      lastHost[3] -= 1;

      // Calculate CIDR notation
      const cidr = maskParts.reduce((acc, octet) => 
        acc + octet.toString(2).split('1').length - 1, 0
      );

      // Calculate total hosts
      const hostBits = 32 - cidr;
      const totalHosts = Math.pow(2, hostBits);
      const usableHosts = Math.max(0, totalHosts - 2);

      setResults({
        networkAddress,
        broadcastAddress,
        firstHost: firstHost.join('.'),
        lastHost: lastHost.join('.'),
        cidrNotation: `${ipAddress}/${cidr}`,
        totalHosts,
        usableHosts,
        subnetMask: subnetMask,
        ipAddress: ipAddress
      });
      
    } catch (error) {
      setResults({ error: error.message });
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <Head>
        <title>Subnet Calculator | Network IP Calculator</title>
        <meta 
          name="description" 
          content="Calculate subnet information including network address, broadcast address, usable host range, and CIDR notation."
        />
        <meta name="keywords" content="subnet calculator, IP calculator, network calculator, CIDR calculator" />
      </Head>

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Subnet Calculator</h1>
        <p className="text-gray-600 mb-6">
          Calculate network information from an IP address and subnet mask
        </p>

        <form onSubmit={calculateSubnet} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="ipAddress" className="block text-sm font-medium text-gray-700 mb-1">
                IP Address
              </label>
              <input
                type="text"
                id="ipAddress"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="192.168.1.1"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                pattern="^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
                required
              />
            </div>
            <div>
              <label htmlFor="subnetMask" className="block text-sm font-medium text-gray-700 mb-1">
                Subnet Mask
              </label>
              <input
                type="text"
                id="subnetMask"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="255.255.255.0"
                value={subnetMask}
                onChange={(e) => setSubnetMask(e.target.value)}
                pattern="^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
                required
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Calculate
            </button>
          </div>
        </form>

        {results && (
          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Results</h2>
            
            {results.error ? (
              <div className="p-4 bg-red-50 rounded-md">
                <p className="text-red-700">{results.error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-md">
                  <h3 className="text-lg font-medium text-blue-800">Network Information</h3>
                  <div className="mt-4 space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">IP Address:</span>
                      <p className="font-mono font-bold">{results.ipAddress}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Subnet Mask:</span>
                      <p className="font-mono font-bold">{results.subnetMask}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">CIDR Notation:</span>
                      <p className="font-mono font-bold">{results.cidrNotation}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-md">
                  <h3 className="text-lg font-medium text-green-800">Address Range</h3>
                  <div className="mt-4 space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Network Address:</span>
                      <p className="font-mono font-bold">{results.networkAddress}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Broadcast Address:</span>
                      <p className="font-mono font-bold">{results.broadcastAddress}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Usable Host Range:</span>
                      <p className="font-mono font-bold">{results.firstHost} - {results.lastHost}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-md">
                  <h3 className="text-lg font-medium text-purple-800">Host Information</h3>
                  <div className="mt-4 space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Total Hosts:</span>
                      <p className="font-mono font-bold">{results.totalHosts}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Usable Hosts:</span>
                      <p className="font-mono font-bold">{results.usableHosts}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How to Use</h2>
          <div className="prose max-w-none">
            <ol className="list-decimal pl-5 space-y-2">
              <li>Enter a valid IPv4 address (e.g., 192.168.1.1)</li>
              <li>Enter a valid subnet mask (e.g., 255.255.255.0)</li>
              <li>Click "Calculate" to see the subnet information</li>
            </ol>
            <p className="mt-4">
              <strong>Note:</strong> This calculator works with IPv4 addresses only.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}